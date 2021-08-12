import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras , ActivatedRoute} from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  message: string;

  constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        public authService: AuthService,
        public router: Router) {

          // redirect to home if already logged in
          if (this.authService.currentUserValue) {
              this.router.navigate(['/admin']);
          }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
}

// convenience getter for easy access to form fields
get f() { return this.loginForm.controls; }

onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }


    // this.loading = true;
    this.authService.login(this.f.email.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
              // Set our navigation extras object
              // that passes on our global query params and fragment
              const navigationExtras: NavigationExtras = {
                queryParamsHandling: 'preserve',
                preserveFragment: true
              };
              // Redirect the user
              this.router.navigateByUrl(this.returnUrl, navigationExtras);
            },
            error => {
              this.error = error.error.message;
              this.loading = false;
            });
}

  logout() {
    this.authService.logout();
  }
}
