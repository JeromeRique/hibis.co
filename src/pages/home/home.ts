import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import { LoginPage } from '../login/login';
import { imgArr } from '../imgArr';
import { AngularFireDatabase } from 'angularfire2/database';
import { Vendor } from '../../models/User/Vendor';
import { VendorDetailsPage } from '../vendor-details/vendor-details'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  icon: string[];
  icons: string[];
  private slider = [];
  private slider2 = [];

  vendor: Object;
  constructor(
    private afAuth: AngularFireAuth,
    private afdb: AngularFireDatabase, 
    private toast: ToastController, 
    public myImageArray: imgArr,
    public navCtrl: NavController, 
    public navParams: NavParams) {

      this.icon = ['flame', 'leaf', 'cart'];
  }

  ionViewWillLoad(){
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid){
        this.toast.create({
          message: `Welcome to Hibis.co, ${data.email}.`,
          duration: 3000
        }).present();
      }
      else{
        this.navCtrl.setRoot(LoginPage)
      }
    });
  }
  ionViewDidLoad() {
    this.populateImgArr();
    //this.loadSlider();
  }
  populateImgArr() {
    // this.slider = [];
    // this.slider2 = [];
    try {
      let ref = this.afdb.database.ref('products/');
      ref.on('child_added', snap => {
        //console.log(snap.key);
        let venKey = snap.key;
        snap.ref.on('child_added', childSnapshot => {
          let p = {
            title: childSnapshot.val().name,
            category: childSnapshot.val().category,
            url: childSnapshot.val().url
          };
          //console.log(venKey);
          //let ven = this.getVendor(venKey);
          //console.log(p);
          if(p.url!= undefined){
            let currentData = {
              url: p.url,
              key: venKey
            }
            if (p.category === "Produce" || p.category === "Food" || p.category === "Foodies"){
              this.slider.push(currentData);
            }
            else if(p.category === "Craft"){
              this.slider2.push(currentData);
            }
            this.myImageArray.images.push(p.url)
          }
        })
      });
    } 
    catch (e) {
      console.log(e);
    }
    // console.log(this.slider);
    // console.log(this.slider2);
  }
  getVendor(vendorID){
    let ref = this.afdb.database.ref('users/' + vendorID)
    ref.on("child_added", snap =>{
      this.vendor = {
        title: snap.val().name,
        owner: snap.val().owner,
        catageries: this.getCategories(snap.key),
        obj: snap.val(),
        key: snap.key
      };
    })
  }

  getVendorData(vendorID): Promise<Object>{
    let ref = this.afdb.database.ref('users/' + vendorID)

    return new Promise((resolve, reject) => {
      ref.on("value", snap =>{
        let vendorInfo = {
          title: snap.val().name,
          owner: snap.val().owner,
          catageries: this.getCategories(snap.key),
          obj: snap.val(),
          key: snap.key
        };

        resolve(vendorInfo);
      })
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
  // itemTapped(event) {
  //   console.log(this.vendor);
  //   // this.navCtrl.push(VendorDetailsPage, {
  //   //   vendor: this.vendor
  //   // });
  // }
  goToVenderDetails(id: string){
    this.getVendorData(id).then((vendorData) => {
      //console.log(vendorData);
      this.navCtrl.push(VendorDetailsPage, {
        vendor: vendorData
      });
    })
  }
}

