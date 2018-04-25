import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { User } from '../../models/User/User';
import { Vendor } from '../../models/User/Vendor';
import { VendorDetailsPage } from '../vendor-details/vendor-details';

@Component({
  selector: 'page-vendor',
  templateUrl: 'vendor.html'
})
export class VendorPage {
  selectedVendor: any;
  icons: string[];
  vendors: Array<{ title: string, owner: string, categories: any, obj: any, key: any }>;
  queryVendor: string;
  temp: Array<Vendor>
  icon: string[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afdb: AngularFireDatabase,
    private afAuth: AngularFireAuth) {

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedVendor = navParams.get('vendor');
    this.icon = ['flame', 'leaf', 'cart'];
    this.vendors = [];
  }

  ionViewDidLoad() {
    this.populateVendors();
  }

  populateVendors() {
    let ref = this.afdb.database.ref().child('users');
    this.temp = []
    ref.on('child_added', snap => {
      if (snap.val().type == 'Vendor') {
        this.vendors.push({
          title: snap.val().name,
          owner: snap.val().owner,
          categories: this.getCategories(snap.key),
          obj: snap.val(),
          key: snap.key
        });
      }
    });
  }

  getCategories(key) {
    let categories = [];
    try {
      let ref = this.afdb.database.ref('products/' + key);
      ref.on('child_added', snap => {
        let p = {
          title: snap.val().name,
          category: snap.val().category
        }
        categories.push(p);
      });
    } catch (e) {
      console.log(e);
    }

    categories.map((e) => {
      return this.getIcon(e.category);
    });

    return categories;
  }

  itemTapped(event, vendor) {
    this.navCtrl.push(VendorDetailsPage, {
      vendor: vendor
    });
  }

  getIcon(category: string) {
    category = category.toLowerCase();
    if (category === 'food') {
      return this.icon[0];
    } else if (category === 'produce') {
      return this.icon[1];
    } else {
      return this.icon[2];
    }
  }

  // updateVendors() {
  //   let query = this.queryVendor.toLowerCase();
  //   let filteredVendors = []

  //   for (let i = 0; i < this.vendors.length; i++) {
  //     if (this.vendors[i].title.includes(query)) {
  //       filteredVendors.push(this.vendors[i])
  //     }
  //   }
  //   this.vendors = filteredVendors;
  // }
}
