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

  constructor(
    private auth: FirebaseUserAuth, 
    public navCtrl: NavController, 
    public navParams: NavParams) {
      //
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerSettingsPage');
    //this.auth.current();
  }

}
