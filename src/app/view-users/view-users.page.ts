import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { snapshotToArray } from '../environment';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.page.html',
  styleUrls: ['./view-users.page.scss'],
})
export class ViewUsersPage implements OnInit {
  //pic : any;
  //room = {} as room;
  rooms;
  users;
   //selectedFile = null;
 
 // ref = firebase.database().ref('rooms/');
  //storageRef = firebase.storage().ref();
  ref2 = firebase.database().ref('users/');

  constructor() {
      this.ref2.on('value', resp => {
        this.users = snapshotToArray(resp);
          console.log(resp.val());

        })


   }
  ngOnInit() {
  }

}
