import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the RegistervendorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseUserAuth } from '../../models/FirebaseUserAuth';
import { User } from '../../models/User/User';
import { Vendor } from '../../models/User/Vendor';

@IonicPage()
@Component({
  selector: 'page-registervendor',
  templateUrl: 'registervendor.html',
})
export class RegistervendorPage {
  private name: string;
  private email: string;
  private owner: string;
  private phone: string;
  private password1: string;
  private password2: string;

  user = {} as User;
  constructor(
    private auth: FirebaseUserAuth,
    private toast: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams) {

  }

  register(user: User) {
    let result;
    if (this.password1 === this.password2) {
      user = new Vendor(this.email, this.name, this.owner, this.phone, this.password1);
      try {
        result = this.auth.register(user);
      } catch (e) {
        this.toast.create({
          message: 'There was an error registering.',
          duration: 3000
        }).present();
      }
    } else {
      this.toast.create({
        message: 'Try again. Your password didn\'t seem to match',
        duration: 3000
      }).present();
    }
    if (result) {
      this.toast.create({
        message: 'You have successfully registered as a vendor.',
        duration: 3000
      }).present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistervendorPage');
  }

}
