import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { snapshotToArray } from '../environment';

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.page.html',
  styleUrls: ['./view-bookings.page.scss'],
})
export class ViewBookingsPage implements OnInit {

  refBookings = firebase.database().ref('bookings/');
  books;
  constructor() {
 
   }

  ngOnInit() {
    this.refBookings.on('value', resp => {
      this.books = snapshotToArray(resp);
        console.log(this.books);

      })
  }

}
