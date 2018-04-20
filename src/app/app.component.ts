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
import { CurrentUser } from '../models/CurrentUser';
import { FirebaseUserAuth } from '../models/FirebaseUserAuth';
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
    private auth: FirebaseUserAuth,
    private toast: ToastController,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public currUser: CurrentUser) {
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

        if (this.currUser.type === 'Customer') {
          this.nav.push(CustomerSettingsPage)
        } else if (this.currUser.type === 'Vendor') {
          this.nav.push(VendorSettingsPage);
        }

    }
    else {
      this.nav.push(page.component);
    }
  }

  logout() {
    try {
      this.auth.logout();
    } catch (e) {
      this.toast.create({
        message: 'Unable to log out',
        duration: 1000
      }).present();
    }
  }
}
