import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../auth/auth.service';
import {ChildrenService} from '../children/children.service';
import {first} from 'rxjs/operators';
import {HouseholdService} from "./household.service";

@Component({
  selector: 'app-household',
  templateUrl: './household.component.html',
  styleUrls: ['./household.component.css']
})
export class HouseholdComponent implements OnInit {

  public token: string;
  households: any;
  public editForm: FormGroup;
  public submitted = false;
  public error = '';
  public added_success = false;
  public edit_success = false;
  public deleted_success = false;
  public message: string;
  public submit_message: any;
  householdID: any;

  constructor(private formBuilder: FormBuilder, public authService: AuthService, public houseHoldService: HouseholdService) {

    const getdata = JSON.parse(localStorage.getItem('currentUser'));

    this.token = getdata.data.token;
  }

  ngOnInit() {
    // get all households
    this.houseHoldService.getHouseholds(this.token)
      .subscribe((data: any) => {
        console.log(data);
        this.households = data;
      });
    // handle edit form
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone_number: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.editForm.controls;
  }

  //
  launchEditModal(id) {

    const allHouseholds = this.households.data;

    allHouseholds.forEach( element => {

      if ( element.id === id ) {
        this.householdID = id;

        this.f.name.setValue(element.name);
        this.f.phone_number.setValue(element.phone_number);
        this.f.country.setValue(element.country);
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

    const name = this.f.name.value;
    const phone_number = this.f.phone_number.value;
    const country = this.f.country.value;

    this.houseHoldService.editHousehold(this.token, this.householdID, {name, phone_number, country})
      .pipe(first())
      .subscribe(
        data => {
          if ( data.message === 'Household Updated successfully.') {
            this.edit_success = true;
            this.submit_message = 'Household Updated successfully.';
          }
        },
        error => {
          this.error = error;
          console.log(error);
        });
  }


  onSubmitAddHousehold() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editForm.invalid) {
      return;
    }

    const formData = new FormData();

    formData.append('name' , this.f.name.value);
    formData.append('phone_number' , this.f.phone_number.value);
    formData.append('country' , this.f.country.value);

    console.log(formData);

    this.houseHoldService.addHousehold(this.token, formData)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          if ( data.message === 'Household Added successfully.') {
            this.added_success = true;
            this.submit_message = 'Household Added successfully.';
          }
        },
        error => {
          this.error = error;
          console.log(error);
        });
  }

  deleteHousehold() {
    this.houseHoldService.deleteHousehold(this.token, this.householdID)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          if ( data.message === 'Household deleted successfully.') {
            this.deleted_success = true;
            this.submit_message = 'Household deleted successfully.';
          }
        },
        error => {
          this.error = error;
          console.log(error);
        });
  }


}
