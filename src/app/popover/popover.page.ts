import { Component, OnInit } from '@angular/core';
import { room } from '../model/room';
import *as firebase from 'firebase';
import { snapshotToArray } from '../environment';
import { Router } from '@angular/router';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {
  pic : any;
  room = {} as room;
  rooms;
  users;
  name;
   //selectedFile = null;
  ref = firebase.database().ref('rooms/');
  storageRef = firebase.storage().ref(); 


  constructor(private router : Router, public loadingController: LoadingController, public alertController: AlertController,public modalCtrl: ModalController,
    public formBuilder: FormBuilder) {
    //this.room.name = new FormControl('Input required', Validators.required);

    this.ref.on('value', resp => {
      this.rooms = snapshotToArray(resp);
        console.log(resp.val());

      });

   }


  ngOnInit() {

  }

    featuredPhotoSelected(event: any){
     
      const i = event.target.files[0];
     console.log(i);
     const upload = this.storageRef.child(i.name).put(i);
     upload.on('state_changed', snapshot => {
       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
       console.log('upload is: ', progress , '% done.');
     }, err => {
     }, () => {
       upload.snapshot.ref.getDownloadURL().then(dwnURL => {
         console.log('File avail at: ', dwnURL);
         this.room.pic = dwnURL;
       });
     });
     }
     async presentAlert() {
      const alert = await this.alertController.create({
        header: 'Error!',
        subHeader: 'Invalid inputs',
        message: 'Your inputs must be valid',
        buttons: ['OK']
      });
  
      await alert.present();
    }
  addRoom(room : room){
    this.presentLoading();
    if(room.price.toString().length<4 || room.name!='' || room.hotelName!='' || room.location!='' || room.pic!='') {     
        let newUser = this.ref.push();
        newUser.set({
        Room_name: room.name,
        Hotelname: room.hotelName,
        Feautures: room.feautures,
        Price: room.price,
        Description : room.description,
        Room_size : room.room_size,
        Location : room.location,
        Pic: room.pic
      })
       this.room.name = '';
       this.room.hotelName = '';
       this.room.feautures = '';
       this.room.description = '';
       this.room.room_size = null,
       this.room.location = '',
       this.room.price = null;
       this.room.pic = 0;
       this.modalCtrl.dismiss({
        'dismissed': true
      });} else {
        this.presentAlert();
      }
      }
      async presentLoading() {
        const loading = await this.loadingController.create({
          message: 'Loading..',
          duration: 1000
        });
        await loading.present();
    
        const { role, data } = await loading.onDidDismiss();
    
        //console.log('Loading dismissed!');
      }
   
}