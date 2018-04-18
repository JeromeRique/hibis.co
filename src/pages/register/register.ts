import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

import { User } from "../../models/User/User";
import { Customer } from "../../models/User/Customer"
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseUserAuth } from '../../models/FirebaseUserAuth';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  private name: string;
  private email: string;
  private password1: string;
  private password2: string;

  user = {} as User;
  constructor(
    private auth: FirebaseUserAuth,
    private toast: ToastController,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  async register(user: User) {
    if (this.password1 === this.password2) {
      user = new Customer(this.email, this.name, this.password1);
      console.log((user));
      try {
        let result = this.auth.register(user);
        this.toast.create({
          message: 'Your account has been registered! Log in.',
          duration: 5000
        }).present();
      } catch (e) {
        this.toast.create({
          message: 'There was an error registering, please try again.',
          duration: 1500
        }).present();
      }
    } else {
      // Present error notification to Customer
      this.toast.create({
        message: 'Try again. Your password didn\'t seem to match',
        duration: 3000
      }).present();
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
