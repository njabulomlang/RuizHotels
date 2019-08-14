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
  roomDetails;
  Description;
Feautures=[];
Hotelname;
Location;
Pic;
Price;
Room_name;
Room_size;
count;
countUsers;
bookedBy;
RoomArry;
UserArry;
Profile_pic; Fullname; Cellphone ; Bio;
Key;
  constructor(private rout : Router, private popover: ModalController, private loadingController : LoadingController) {
    this.presentLoading();
    // this.ref.on('value', resp => {
    //   this.users = snapshotToArray(resp).length;
    //     console.log(this.users);
    //   })
    this.refUser.child('users').orderByChild('UID').equalTo(this.userID).on('value', resp =>{
     this.user = snapshotToArray(resp);
     // console.log(this.user);
      
     });
    
       this.refBookings.on('value', resp => {
       this.books = snapshotToArray(resp).length;
         // console.log(this.books);
  
        })
        this.refRooms.on('value', resp => {
          this.rooms = snapshotToArray(resp);
          //  console.log(this.rooms);
            this.count = snapshotToArray(resp).length;
    
          })
          this.ref.on('value', resp => {
              this.users = snapshotToArray(resp);
              this.countUsers = snapshotToArray(resp).length;
      
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

  viewRooms(item){
    console.log(item);
    this.RoomArry = item;
    this.UserArry = [];
  }
  delete(key){
    firebase.database().ref('rooms/'+key).remove();
    //this.RoomArry=[];
    this.Pic = '';
    this.Hotelname = '';
    this.Room_name = '';
    this.Location = '';
    this.Room_size = '';
    this.Feautures = null;
    this.Price = null;
    this.Description = '';
    this.Key = '';
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
 gotorooms(pic, hotel,name,loc,size, feat,price,descr,key){
  this.UserArry = [];
  this.Pic = pic;
  this.Hotelname = hotel;
  this.Room_name = name;
  this.Location = loc;
  this.Room_size = size;
  this.Feautures = feat;
  this.Price = price;
  this.Description = descr;
  this.Key = key;

  this.refUser.child('bookings').orderByChild('Room').equalTo(name).on('value', resp =>{
   this.bookedBy = snapshotToArray(resp); 
     
  })
  
  }
  userDetails(pic,name,cell,bio){
    this.RoomArry=[];
    this.Profile_pic = pic;
    this.Fullname = name;
    this.Cellphone = cell;
    this.Bio = bio;
  
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
  allUsers(item){
    this.RoomArry=[];
     this.UserArry = item;
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait..',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    //console.log('Loading dismissed!');
  }
}
