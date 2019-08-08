import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email;
  password;
  constructor(public alertController: AlertController, public loadingController: LoadingController) {
    
   }

  ngOnInit() {
  }
 Login(){
  this.presentLoading();
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((resp)=>{
      console.log(resp);
    }).catch(async (err)=>{
      const alert = await this.alertController.create({
        header: 'Alert',
        subHeader: err.code,
        message: err.message,
        buttons: ['OK']
      });
      await alert.present();
      
    })
    
    
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait..',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }
}
