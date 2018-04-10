import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

import { User } from "../../models/user";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;
  constructor(private afAuth: AngularFireAuth, private afdb: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
  }
  async register(user: User){

    try{
      let uuid = this.afAuth.auth.currentUser.uid;
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      let ref = this.afdb.database.ref('users/' + uuid).set({
        email: user.email,
        type: "None"
      })
      console.log(ref)
      console.log(result);
    }
    catch(e){
      console.error(e);
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
