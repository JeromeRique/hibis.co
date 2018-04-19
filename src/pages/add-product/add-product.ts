import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {
  product: {title: string, category: string};
  
  category: string;
  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController) {
      this.product = {
        title: "",
        category: ""
      };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
  }

  closeModal (data=null) {
    if (data)
      this.viewCtrl.dismiss({data: this.product});
    else
      this.viewCtrl.dismiss();
  }

  add () {
    this.closeModal(this.product);
  }

}
