import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    private afAuth: AngularFireAuth, 
    private toast: ToastController, 
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  slider = [
    {
      title:'Slide1',
      desc:'We got some text, fam.',
      img: 'assets/imgs/onion.jpg'
    }, {
      title: 'Slide2',
      desc:'Getting old...',
      img: 'assets/imgs/lettuce.jpg'
    }
  ];

  infoSlide = [];

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
}

