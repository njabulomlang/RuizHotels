import { ViewRoomsPageModule } from './view-rooms/view-rooms.module';
import { ViewUsersPageModule } from './view-users/view-users.module';
import { ViewBookingsPageModule } from './view-bookings/view-bookings.module';

import { PopoverPageModule } from './popover/popover.module';
import { ModalPageModule } from './modal/modal.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
     IonicModule.forRoot(),
     AppRoutingModule,
     ModalPageModule, 
     PopoverPageModule,
     ViewBookingsPageModule,
     ViewUsersPageModule,
     ViewBookingsPageModule,
     ViewRoomsPageModule
    
    ],
    

  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
