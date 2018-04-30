import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseUserAuth } from '../../models/FirebaseUserAuth';
//import { CallNumber } from '@ionic-native/call-number';

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
  vendor: { title: string, owner: string, categories: any, obj: any, key: any };
  products: any;
  display_pic: string;
  icon: string[];
  favorite: boolean;
  dv: string;
  uv: string;
  constructor(
    private afdb: AngularFireDatabase,
    //private call: CallNumber,
    private toast: ToastController,
    public navCtrl: NavController,
    public firebaseAuth: FirebaseUserAuth,
    public afauth: AngularFireAuth,
    public navParams: NavParams) {
    //
    this.products = [];
    this.icon = ['flame', 'leaf', 'cart'];
    this.display_pic = 'assets/imgs/lettuce.jpg';
    this.vendor = navParams.get('vendor');
    this.favorite = false;
    this.dv = '0';
    this.uv = '0';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorDetailsPage');
    this.isFavorite();
    this.populateProducts();
    this.checkRate();
  }

  // async callNumber():Promise <any> {
  //   try {
  //     await this.call.callNumber(this.vendor.obj.phone,true);
  //   } catch (e) {
  //     console.log(e);
  //     this.toast.create({
  //       message: 'Could not place the call.',
  //       duration: 1000
  //     }).present();
  //   }
  // }

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

  /**
   * This function is fired to set the current Vendor to be a 
   * favorite of the current logged in User.
   */
  addFavorite(){
    if (this.favorite) {
      this.firebaseAuth.checkAuth().subscribe((data)=>{
        if (data!=null){
          let ref = this.afdb.database.ref('favorites/'+ data.uid);
          ref.child(this.vendor.key).remove();
        }
      });
      this.favorite = false;
    } else {
      this.firebaseAuth.checkAuth().subscribe((data)=>{
        if (data!= null){
          let ref = this.afdb.database.ref('favorites/'+data.uid+'/' + this.vendor.key).set({
              name: this.vendor.title,
              owner: this.vendor.owner
          });
        }
      });
      this.favorite = true;
    }

  }
  /**
   * This function is fired to initialize the favorite button, 
   * whether the current vendor is favorited or not.
   */
  isFavorite() {
    this.firebaseAuth.checkAuth().subscribe((data) => {
      if (data!=null) {
        let ref = this.afdb.database.ref('favorites/'+ data.uid);
        ref.once('value', (snap) => {
          if (snap.hasChild(this.vendor.key)) {
            this.favorite = true;
          } else {
            this.favorite = false;
          }
        });
      }
    });
  }
  checkRate(){
    let ref = this.afdb.database.ref('votes/');
    ref.once('value', (snap)=>{
      if(snap.hasChild(this.vendor.key))
        this.getRate()
      else
        this.setRate();
    })
  }
  setRate(){
    let ref = this.afdb.database.ref('votes/' +this.vendor.key)
    ref.set({
      'up-votes': 0,
      'down-votes': 0
    })
  }
  getRate(){
    let ref = this.afdb.database.ref('votes/'+ this.vendor.key)
    ref.on('value', (snap)=>{
      let votes = snap.val();
      this.dv = votes['down-votes'];
      this.uv = votes['up-votes'];
    })
    console.log(this.dv);
    console.log(this.uv);

  }
  downVote(){
    let ref = this.afdb.database.ref('votes/' +this.vendor.key+ '/down-votes')
    ref.once('value', (snap)=>{
      let dv = snap.val();
      console.log(dv)
      dv++;
      ref.set(dv);
    })
  }
  upVote(){
    let ref = this.afdb.database.ref('votes/' +this.vendor.key+ '/up-votes')
    ref.once('value', (snap)=>{
      let uv = snap.val();
      console.log(uv)
      uv++;
      ref.set(uv);
    })
  }
}