import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { FirebaseUserAuth } from '../../models/FirebaseUserAuth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {
  product: {title: string, category: string};
  
  category: string;
  constructor(
    private afAuth: AngularFireAuth,
    private afdb: AngularFireDatabase,
    private toast: ToastController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
      this.product = {
        title: "",
        category: ""
      };
  }

  ionViewDidLoad() {

  }

  closeModal (data=null) {
    if (data)
      this.viewCtrl.dismiss({data: this.product});
    else
      this.viewCtrl.dismiss();
  }

  add () {
    try {
      let uid = this.afAuth.auth.currentUser.uid;
      let ref = this.afdb.database.ref('products/'+uid).push().set({
        name: this.product.title,
        category: this.product.category
      });
    } catch (e) {
      this.toast.create({
        message: 'Could not create product',
        duration: 1000
      }).present();
    }
    this.closeModal(this.product);
  }

}
