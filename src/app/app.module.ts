import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { VendorPage } from '../pages/vendor/vendor';
import { SettingsPage } from '../pages/settings/settings';

// import { VideoPlayer } from '@ionic-native/video-player';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import {AngularFireModule} from 'angularfire2';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FirebaseUserAuth } from '../models/FirebaseUserAuth';
import { VendorDetailsPage } from '../pages/vendor-details/vendor-details';
import { CustomerSettingsPage } from '../pages/customer-settings/customer-settings';
import { VendorSettingsPage } from '../pages/vendor-settings/vendor-settings';
import { CurrentUser } from '../models/CurrentUser';
import { CallNumber } from '@ionic-native/call-number';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    VendorPage,
    SettingsPage,
    VendorDetailsPage,
    CustomerSettingsPage,
    VendorSettingsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      menuType: 'overlay'
    }),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    VendorPage,
    SettingsPage,
    VendorDetailsPage,
    CustomerSettingsPage,
    VendorSettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseUserAuth,
    CurrentUser,
    CallNumber,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}