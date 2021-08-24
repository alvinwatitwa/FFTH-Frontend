import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ChildrenService } from './children.service';
import Children from './Children';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { first } from 'rxjs/operators';
import {HouseholdService} from '../household/household.service';
import {environment} from '@environments/environment';

declare var $: any;

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css']
})
export class ChildrenComponent implements OnInit {

  public token: string;
  children: any;
  households: any;
  public editForm: FormGroup;
  public submitted = false;
  public error = '';
  public added_success = false;
  public edit_success = false;
  public deleted_success = false;
  public message: string;
  public submit_message: any;

  filePhoto: any;
  childID: any;
  currentChildPhoto: any;
  imagePublicUrl = `${environment.imageUrl}`;

  constructor(private formBuilder: FormBuilder,
              public authService: AuthService,
              public childrenService: ChildrenService,
              public houseHoldService: HouseholdService) {

    const getdata = JSON.parse(localStorage.getItem('currentUser'));

    this.token = getdata.data.token;
  }

  ngOnInit() {
    // get all children
   this.getAllChildren();
    // handle edit form
   this.editForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      Country: ['', Validators.required],
      gender: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      photo: ['', []],
      hobbies: ['', Validators.required],
      history: ['', Validators.required],
      support_amount: ['', Validators.required],
      frequency: ['', Validators.required],
      household_id: ['', Validators.required],
    });

    // fetch households
   this.getHouseholds();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.editForm.controls;
  }

  //
  launchEditModal(id) {

    const allChildren = this.children.data;

    allChildren.forEach( element => {

      console.log(element.frequency);

      if ( element.id === id ) {

        this.childID = id;
        this.currentChildPhoto = element.photo;

        this.f.firstname.setValue(element.first_name);
        this.f.lastname.setValue(element.last_name);
        this.f.Country.setValue(element.Country);
        this.f.gender.setValue(element.gender);
        this.f.date_of_birth.setValue(element.date_of_birth);
        // this.f.photo.setValue(element.photo);
        this.f.hobbies.setValue(element.hobbies);
        this.f.history.setValue(element.history);
        this.f.support_amount.setValue(element.support_amount);
        this.f.frequency.setValue(element.frequency);
        this.f.household_id.setValue(element.household_id);
      }

    });
  }

  //
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editForm.invalid) {
      return;
    }
    const first_name = this.f.firstname.value;
    const last_name = this.f.lastname.value;
    const Country = this.f.Country.value;
    const gender = this.f.gender.value;
    const date_of_birth = this.f.date_of_birth.value;
    const photo: any = this.filePhoto;
    const hobbies = this.f.hobbies.value;
    const history = this.f.history.value;
    // tslint:disable-next-line:variable-name
    const support_amount = this.f.support_amount.value;
    const frequency = this.f.frequency.value;
    const household_id = this.f.household_id.value;

    // tslint:disable-next-line:max-line-length
    this.childrenService.editChild(this.token, this.childID, {first_name, last_name, Country, gender, photo, household_id, date_of_birth, hobbies, history, support_amount, frequency})
        .pipe(first())
        .subscribe(
            data => {
              console.log(data);
              if ( data.success === true) {
                this.edit_success = true;
                this.submit_message = 'Child Updated successfully.';
                this.getAllChildren();
                $('#exampleModalCenter').click();
              }
            },
            error => {
                this.error = error;
                console.log(error);
            });
  }


  onSubmitAddChild() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.editForm.invalid) {
      return;
    }
    const formData = new FormData();

    formData.append('first_name' , this.f.firstname.value);
    formData.append('last_name' , this.f.lastname.value);
    formData.append('Country' , this.f.Country.value);
    formData.append('gender' , this.f.gender.value);
    formData.append('date_of_birth' , this.f.date_of_birth.value);
    formData.append('photo' , this.filePhoto);
    formData.append('hobbies' , this.f.hobbies.value);
    formData.append('history' , this.f.history.value);
    formData.append('support_amount' , this.f.support_amount.value);
    formData.append('frequency' , this.f.frequency.value);
    formData.append('household_id' , this.f.household_id.value);

    this.childrenService.addChild(this.token, formData)
        .pipe(first())
        .subscribe(
            data => {
              console.log(data);
              if ( data.message === 'Child Added successfully.') {
                this.added_success = true;
                this.submit_message = 'Child Added successfully.';
                this.getAllChildren();
                $('#addChildForm').click();
              }
            },
            error => {
                this.error = error;
                console.log(error);
            });
  }

  uploadFile(event) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.filePhoto = file;
      console.log('on uploadFile');
      console.log(this.filePhoto);
    }
  }

  deleteChild() {

    this.childrenService.deleteChild(this.token, this.childID)
    .pipe(first())
    .subscribe(
        data => {
          console.log(data);
          if ( data.message === 'Child deleted successfully.') {
            this.deleted_success = true;
            this.submit_message = 'Child deleted successfully.';
          }
        },
        error => {
            this.error = error;
            console.log(error);
        });

  }

  /**
   * get all households
   */
  getHouseholds() {
    this.houseHoldService.getHouseholds(this.token)
      .subscribe((data: any) => {
        console.log(data);
        this.households = data.data;
      });
  }
  getAllChildren(){
    this.childrenService.getChildren(this.token)
      .subscribe((data: any) => {
        console.log(data);
        this.children = data;
      });
  }
}
