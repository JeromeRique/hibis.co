import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { FirebaseUserAuth } from '../../models/FirebaseUserAuth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app'
import { UploadFileService, Upload } from './upload';
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
  selectedFiles: FileList;
  currentUpload: Upload;
  product: {title: string, category: string, upload: Upload, url: string};
  
  category: string;
  constructor(
    private upSvc: UploadFileService,
    private afAuth: AngularFireAuth,
    private afdb: AngularFireDatabase,
    private toast: ToastController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
      this.product = {
        title: "",
        category: "",
        upload: null,
        url: ""
      };
  }

  ionViewDidLoad() {

  }

  closeModal (data=null) {
    if (data)
      this.viewCtrl.dismiss({data: this.product});
    else
      this.viewCtrl.dismiss();
  }
  add () {
    try {
      let uid = this.afAuth.auth.currentUser.uid;

      this.uploadSingle().then((urlData) => {
        let ref = this.afdb.database.ref('products/'+uid).push().set({
          name: this.product.title,
          category: this.product.category,
          url: urlData
        });
      })
      
    } catch (e) {
      console.log(e);
      this.toast.create({
        message: 'Could not create product',
        duration: 1000
      }).present();
    }
    //this.closeModal(this.product);
  }

  detectFiles(event){
    this.selectedFiles = event.target.files;
  }
  uploadSingle(): Promise<string>{
    let file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    return this.upSvc.pushUpload(this.currentUpload).then((url) => {
      console.log(url);
      return url;
    })
    
  }
}
