import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController} from 'ionic-angular';
import { FirebaseUserAuth } from '../../models/FirebaseUserAuth';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the VendorSettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vendor-settings',
  templateUrl: 'vendor-settings.html',
})
export class VendorSettingsPage {
  products: Array<{title: string, category: string}>

  constructor(
    private afAuth: AngularFireAuth,
    private afdb: AngularFireDatabase,
    private modal: ModalController,
    private toast: ToastController,
    public navCtrl: NavController, 
    public navParams: NavParams) {

      // populateProducts()
      this.products = [];
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorSettingsPage');
    this.populateProducts();
  }

  updateSettings() {
    console.log("Not quite there...");
  }

  openModal() {
    const prodmod = this.modal.create('AddProductPage');
    prodmod.present();

    prodmod.onDidDismiss((p) => {
      this.toast.create({
        message: 'Successfully added product',
        duration: 1000
      }).present();
    })
  }
  populateProducts () {
    try {
      let uid = this.afAuth.auth.currentUser.uid;
      let ref = this.afdb.database.ref('products/' + uid);
      ref.on('child_added', snap => {
        let p = {
          title: snap.val().name,
          category: snap.val().category
        };
        this.products.push(p);
      });
    } catch (e) {
      console.log(e);
    }
  }

}
