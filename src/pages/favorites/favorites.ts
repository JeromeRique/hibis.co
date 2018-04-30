import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseUserAuth } from '../../models/FirebaseUserAuth';
import { AngularFireDatabase } from 'angularfire2/database';

//import { User } from '../../models/User/User';
import { Vendor } from '../../models/User/Vendor';
import { VendorDetailsPage } from '../vendor-details/vendor-details';

/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  selectedVendor: any;
  icons: string[];
  favorites: Array<{ title: string, owner: string, categories: any, obj: any, key: any }>;
  queryVendor: string;
  temp: Array<Vendor>
  icon: string[];

  constructor(
    private afauth: FirebaseUserAuth,
    private afdb: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.icon = ['flame', 'leaf', 'cart'];
    this.favorites = []; //Initializing vendor array

  }

  ionViewDidLoad() {
    this.populateFavorites();
  }

  populateFavorites() {
    //this.favorites= Array<{ title: string, owner: string, categories: any, obj: any, key: any }>();
    this.afauth.checkAuth().subscribe((data) => {
      if (data != null) {
        let ref = this.afdb.database.ref('favorites/' + data.uid);
        ref.on('child_added', snap => {
          //this.getFavorites(snap.key);
          this.favorites.push({
            title: snap.val().name,
            owner: snap.val().owner,
            categories: this.getCategories(snap.key),
            obj: snap.val(),
            key: snap.key
          }); 
        })
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


  itemTapped(event, vendor) {
    this.navCtrl.push(VendorDetailsPage, {
      vendor: vendor
    });
  }

  getFavorites (key: any) {
    let ref = this.afdb.database.ref('users/');
    ref.on('child_added', snap => {
      if (snap.key === key) {
        this.favorites.push({
          title: snap.val().name,
          owner: snap.val().owner,
          categories: 0,
          obj: snap.val(),
          key: snap.key
        });
      }
    })
  }
}
