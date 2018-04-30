import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { User } from '../../models/User/User';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { FirebaseUserAuth } from '../../models/FirebaseUserAuth';
import { Storage } from '@ionic/storage'
import { Vendor } from '../../models/User/Vendor';
import { Customer } from '../../models/User/Customer';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private email: string;
  private password: string;

  user ={} as User;

  constructor(
    private auth: FirebaseUserAuth,
    private toast: ToastController,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }
  login(user:User) {
    user = new User (this.email, this.password)
    let result;
    try { 
      result = this.auth.login(user);
      this.auth.currentUser();
    } catch (e) {
      this.toast.create({
        message: 'Could not authenticate.',
        duration: 3000
      }).present();
    }
    if (result) {
      this.navCtrl.setRoot(HomePage)
    }
  }
  register(){
    this.navCtrl.push('RegisterPage')
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}

