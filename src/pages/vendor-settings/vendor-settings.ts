import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';

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
    private modal: ModalController,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  
  this.products =  [
    { title: 'None', category: 'None'},
    { title: 'One', category: 'Number'}
  ];
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorSettingsPage');
  }

  updateSettings() {
    console.log("Not quite there...");
  }

  openModal() {
    const prodmod = this.modal.create('AddProductPage', {products: this.products});
    prodmod.present();

    prodmod.onDidDismiss((p) => {
      this.products.push(p.data);
      console.log(p.data);
      console.log('New product added.');
    })
  }

}
