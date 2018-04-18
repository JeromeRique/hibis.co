import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { VendorPage } from '../pages/vendor/vendor';
import { SettingsPage } from '../pages/settings/settings';
import { Storage } from '@ionic/storage';
import { Customer } from '../models/User/Customer';
import { Vendor } from '../models/User/Vendor';
import { User } from '../models/User/User';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { CustomerSettingsPage } from '../pages/customer-settings/customer-settings';
import { VendorSettingsPage } from '../pages/vendor-settings/vendor-settings';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  user: any;
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';

  pages: Array<{ title: string, component: any }>;

  constructor(
    private afAuth: AngularFireAuth,
    private afdb: AngularFireDatabase,
    private toast: ToastController,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public storage: Storage) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Vendors', component: VendorPage },
      { title: 'Settings', component: SettingsPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.component == HomePage) {
      
    }
    else if (page.component == SettingsPage) {
      try {
        
        let ref;
        let email = this.afAuth.auth.currentUser.email;
        console.log(email);
        let type;
        ref = this.afdb.database.ref('users');
        ref.orderByChild('email').equalTo(email).on('child_added', snap => {
            let s = snap.val();
            type = s['type'];
        });
        if (type === 'Vendor') {
          this.nav.push(SettingsPage)
        } else if (type === 'Customer') {
         // this.nav.push(CustomerSettingsPage);
         this.nav.push(VendorSettingsPage);
        }
      } catch (e) {
          console.log(e);
      }
    }
    else {
      this.nav.push(page.component);
    }
  }

  logout() {
    if (this.afAuth.auth!.currentUser != null) {
       try {
           this.afAuth.auth.signOut();
       } catch (e) {
            console.log("Error logging out: " + e);
       }
    }
}
}
