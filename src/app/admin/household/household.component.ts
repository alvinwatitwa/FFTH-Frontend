import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../auth/auth.service';
import {ChildrenService} from '../children/children.service';
import {first} from 'rxjs/operators';
import {HouseholdService} from "./household.service";

declare var $: any;

@Component({
  selector: 'app-household',
  templateUrl: './household.component.html',
  styleUrls: ['./household.component.css']
})
export class HouseholdComponent implements OnInit {

  public token: string;
  households: any;
  public editForm: FormGroup;
  public newMemberForm: FormGroup;
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
    // handle edit form
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone_number: ['', Validators.required],
      country: ['', Validators.required]
    });
    this.getAllHouseHolds();
    this.initMemberForm();
  }
  getAllHouseHolds() {
    // get all households
    this.houseHoldService.getHouseholds(this.token)
      .subscribe((data: any) => {
        this.households = data;
      });
  }

  initMemberForm() {
    this.newMemberForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      household_id: ['', []],
      household_head: ['', Validators.required],
    });
  }
  get newF(){
    return this.newMemberForm.controls;
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
          if ( data.success === true) {
            this.edit_success = true;
            this.submit_message = 'Household Updated successfully.';
            this.getAllHouseHolds();
            $('#exampleModalCenter').click();
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
            this.getAllHouseHolds();
            $('#deleteChildForm').click();
          } else {
          }
        },
        error => {
          this.error = error;
          console.log(error);
        });
  }

  launchMembersAddModal(householdId) {
      this.householdID = householdId;
  }
  launchDeleteModal(householdId) {
    this.householdID = householdId;
  }
  createMember() {
    // stop here if form is invalid
    if (this.newMemberForm.invalid) {
      console.log(this.newMemberForm);
      return;
    }

    const formData = new FormData();

    formData.append('first_name' , this.newF.first_name.value);
    formData.append('last_name' , this.newF.last_name.value);
    formData.append('gender' , this.newF.gender.value);
    formData.append('phone' , this.newF.phone.value);
    formData.append('household_id' , this.householdID);
    formData.append('household_head' , this.newF.household_head.value);

    this.houseHoldService.addHouseholdMember(this.token, formData)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          if ( data.message === 'Member Added successfully.') {
            this.added_success = true;
            this.submit_message = 'Member Added successfully.';
            window.location.reload();
            // $('#createMember').click();
          }
        },
        error => {
          this.error = error;
          console.log(error);
        });
  }



}
