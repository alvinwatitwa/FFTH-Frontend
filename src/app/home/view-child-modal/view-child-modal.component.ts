import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-view-child-modal',
  templateUrl: './view-child-modal.component.html',
  styleUrls: ['./view-child-modal.component.css']
})
export class ViewChildModalComponent implements OnInit {
@Input() child: any;
  constructor() { }

  ngOnInit() {
  }

}
