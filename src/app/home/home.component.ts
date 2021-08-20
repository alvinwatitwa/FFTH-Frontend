import { Component, OnInit } from '@angular/core';
import {HomeService} from './home.service';
import Children from '../admin/children/Children';
import {environment} from "@environments/environment";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  children: Array<Children> = [];
  imagePublicUrl = `${environment.imageUrl}`;

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.getChildren();
  }

  getChildren() {
    this.homeService.getRandomChildren()
      .subscribe((data: any) => {
        this.children = data.data;
      });
  }

  public ageFromDateOfBirthday(dateOfBirth: any): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

}
