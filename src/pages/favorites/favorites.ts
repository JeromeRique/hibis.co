import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseUserAuth } from '../../models/FirebaseUserAuth';
import { AngularFireDatabase } from 'angularfire2/database';
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
  
  favorites: Array<{ title: string, owner: string }>;

  constructor(
    private afauth: FirebaseUserAuth,
    private afdb: AngularFireDatabase,
    public navCtrl: NavController, 
    public navParams: NavParams) 
    
    {
      this.favorites = []; //Initializing vendor array
      
    }

    

  ionViewDidLoad() {
    this.populateFavorites();
  }

  populateFavorites () {
    this.afauth.checkAuth().subscribe((data) => {
      if (data != null) {
        //console.log(data);
        let ref = this.afdb.object('favorites/');
        ref.snapshotChanges().subscribe((changes) => {
          if (changes.payload.hasChild(data.uid)) {
            //console.log("Show favorites for "+ data.uid);
            changes.payload.forEach((vendor) => {
              //console.log(vendor.val());
              this.favorites.push({
                title: vendor.val().title,
                owner: vendor.val().owner,
              });
              return true;
            });
          }
        });
      }
    });
  }
}
