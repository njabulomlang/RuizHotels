import { ViewUsersPage } from './../view-users/view-users.page';
import { ViewBookingsPage } from './../view-bookings/view-bookings.page';
import { ViewRoomsPage } from './../view-rooms/view-rooms.page';
import { PopoverPage } from './../popover/popover.page';
import { ModalController, PopoverController, LoadingController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalPage } from '../modal/modal.page';
import * as firebase from 'firebase';
import { snapshotToArray } from '../environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  value = 0;
  ref = firebase.database().ref('users/');
  refUser= firebase.database().ref();
  refBookings = firebase.database().ref('bookings/');
  refRooms = firebase.database().ref('rooms/');
  userID = firebase.auth().currentUser.uid;
  user;
  users;
  books;
  rooms;
  constructor(private rout : Router, private popover: ModalController, private loadingController : LoadingController) {
    this.presentLoading();
    this.ref.on('value', resp => {
      this.users = snapshotToArray(resp).length;
        console.log(this.users);
      })
    this.refUser.child('users').orderByChild('UID').equalTo(this.userID).on('value', resp =>{
     this.user = snapshotToArray(resp);
      console.log(this.user);
      
    });
      this.refBookings.on('value', resp => {
        this.books = snapshotToArray(resp).length;
          console.log(this.books);
  
        })
        this.refRooms.on('value', resp => {
          this.rooms = snapshotToArray(resp).length;
            console.log(this.rooms);
    
          })
      
  }
  async view(){
    this.presentLoading();
    const popover = await this.popover.create({
      component: ViewUsersPage,
      componentProps: {
        custom_id : this.value
      },
    
    });
     popover.present();
  }
   async add(ev: Event){
     this.presentLoading();
    const popover = await this.popover.create({
      component: PopoverPage,
      componentProps: {
        custom_id : this.value
      },
    
    });
     popover.present();
  }

  async bookings(ev: Event){
    this.presentLoading();
    const popover = await this.popover.create({
      component: ViewBookingsPage,
      componentProps: {
        custom_id : this.value
      },
    
    });
     popover.present();
  }
  async gotorooms(){
    this.presentLoading();
    const popover = await this.popover.create({
      component: ViewRoomsPage,
      componentProps: {
        custom_id : this.value
      },
    
    });
     popover.present();
  }
  logout(){
    this.presentLoading();
    firebase.auth().signOut().then(() => {
      console.log('logged Out');
       this.rout.navigateByUrl('/');
    }).catch(function(error) {
      // An error happened.
    });

  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait..',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }
}
