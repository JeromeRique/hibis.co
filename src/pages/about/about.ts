import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { VideoPlayer, VideoOptions } from '@ionic-native/video-player';
/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  // vidOpts: VideoOptions;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams) {
      //...
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  // playVideo () {
  //   this.vidOpts = {volume: 1.0};
  //   this.vidPlayer.play('https://www.youtube.com/watch?v=JpP5FC-flyo').then(() => {
  //     // Toast Video End
  //   }).catch(err => {
  //     console.log(err);
  //   });
  // }

  // stopVideo () {
  //   this.vidPlayer.close();
  // }

}
