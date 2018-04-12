import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VendorDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vendor-details',
  templateUrl: 'vendor-details.html',
})
export class VendorDetailsPage {
  vendor: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.vendor = navParams.get('vendor');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorDetailsPage');
    console.log(this.vendor)
  }

}
