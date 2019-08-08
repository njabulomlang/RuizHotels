import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { snapshotToArray } from '../environment';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-view-rooms',
  templateUrl: './view-rooms.page.html',
  styleUrls: ['./view-rooms.page.scss'],
})
export class ViewRoomsPage implements OnInit {

  ref = firebase.database().ref('rooms/');
  users;
  constructor(public loadCtrl: LoadingController) {
    this.ref.on('value', resp => {
      this.users = snapshotToArray(resp);
        console.log(this.users);

      })
   }

  ngOnInit() {
  }

delete(key){
  firebase.database().ref('rooms/'+key).remove();
}
}
