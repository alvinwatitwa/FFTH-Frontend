import { Component, OnInit } from '@angular/core';
import {MembersService} from "./members.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  houseHoldId: number;
  households: Array<any> = [];

  constructor(private membersService: MembersService, private ar: ActivatedRoute) { }

  ngOnInit() {
  }

  getHouseholdId() {
    const sub = this.ar.params.subscribe({
      next: (params) => {
        this.houseHoldId = +params.id;
        this.getHouseholdMembers(+params.id);
      },
      complete: () => {
        sub.unsubscribe();
      },
    });
  }

getHouseholdMembers(householdId) {
  this.membersService.getMembers(householdId)
    .subscribe((data: any) => {
      console.log(data);
      this.households = data;
    });
}

}
