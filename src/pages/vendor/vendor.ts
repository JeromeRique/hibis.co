import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-vendor',
  templateUrl: 'vendor.html'
})
export class VendorPage {
  selectedVendor: any;
  icons: string[];
  vendors: Array<{title: string, note: string, icon: string}>;
  queryVendor: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedVendor = navParams.get('vendor');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.vendors = [];
    for (let i = 1; i < 11; i++) {
      this.vendors.push({
        title: 'Vendor ' + i,
        note: 'This is vendor #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, vendor) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(VendorPage, {
      vendor: vendor
    });
  }

  updateVendors() {
    let query = this.queryVendor.toLowerCase();
    let filteredVendors = []

    for (let i = 0; i < this.vendors.length; i++) {
      if (this.vendors[i].title.includes(query)) {
        filteredVendors.push(this.vendors[i])
      }
    }
    this.vendors = filteredVendors;
  }
}
