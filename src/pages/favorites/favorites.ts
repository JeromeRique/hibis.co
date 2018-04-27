import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseUserAuth } from '../../models/FirebaseUserAuth';
import { AngularFireDatabase } from 'angularfire2/database';
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

  favorites: Array<{ title: string, owner: string, categories: any, obj: any, key: any }>;

  constructor(
    private afauth: FirebaseUserAuth,
    private afdb: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.favorites = []; //Initializing vendor array

  }

  ionViewDidLoad() {
    this.populateFavorites();
  }

  populateFavorites() {
    this.afauth.checkAuth().subscribe((data) => {
      if (data != null) {
        let ref = this.afdb.database.ref('favorites/' + data.uid);
        ref.on('child_added', (snap) => {
          this.getFavorites(snap.key);
        })
      }
    });
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
