import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseUserAuth } from '../../models/FirebaseUserAuth';

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
  products: any;
  display_pic: string;
  icon: string[];

  constructor(
    private afdb: AngularFireDatabase,
    public navCtrl: NavController,
    public firebaseAuth: FirebaseUserAuth,
    public afauth: AngularFireAuth,
    public navParams: NavParams) {
    //
    this.products = [];
    this.icon = ['flame', 'leaf', 'cart'];
    this.display_pic = 'assets/imgs/lettuce.jpg';
    this.vendor = navParams.get('vendor');
    this.populateProducts();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorDetailsPage');
  }

  populateProducts() {
    try {
      let ref = this.afdb.database.ref('products/' + this.vendor.key);
      ref.on('child_added', snap => {
        let p = {
          title: snap.val().name,
          category: snap.val().category,
          icon: this.getIcon(snap.val().category)
        };
        this.products.push(p);
      });
    } catch (e) {
      console.log(e);
    }
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
  
  favorite(){
    console.log(this.vendor);
    // let vendorData = {
    //   "vendor": this.vendor
    // }
    this.firebaseAuth.checkAuth().subscribe((data)=>{
      if (data!= null){
        let ref = this.afdb.list('favorites/'+ data.uid +'/');
        ref.set("vendor", this.vendor);
      }
    })

  }
}
