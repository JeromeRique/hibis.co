import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseUserAuth } from '../../models/FirebaseUserAuth';

/**
 * Generated class for the CustomerSettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-settings',
  templateUrl: 'customer-settings.html',
})
export class CustomerSettingsPage {
  user: {name: string, email: string, password: string};
  constructor(
    private auth: FirebaseUserAuth, 
    public navCtrl: NavController, 
    public navParams: NavParams) {
      this.user = {
        name: "",
        email: "",
        password: ""
      };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerSettingsPage');
    //this.auth.current();
  }

  updateSettings () {
    try {
      this.auth.updateUserSettings(this.user);
    } catch(e) {

    }
  }
  
  deleteAccount () {
    try {
      this.auth.deleteAccount();
    } catch (e) {
      console.log(e);
    }
  }

}
