import { Component, OnInit } from '@angular/core';
import arry from '../home/home.page';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.page.html',
  styleUrls: ['./view-users.page.scss'],
})
export class ViewUsersPage implements OnInit {
  d = arry ;
  pic;
  name;
  bio;
  cell;
  constructor() {
  this.pic = this.d[0].pic;
  this.name = this.d[0].name;
  this.cell = this.d[0].cell;
  this.bio = this.d[0].bio;
   }
  ngOnInit() {
  }

}
