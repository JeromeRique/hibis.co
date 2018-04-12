import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google: any;
/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  @ViewChild('map') mapEl: ElementRef;
  map: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
    this.initMap();
  }

  initMap () {
    let geoLoc = new google.maps.LatLng(10.663577, -61.450073);
    
    let mapOpt = {
      center: geoLoc,
      zoom: 15,
      mapTypeId: 'hybrid',
      streetViewControl: false
    }

    this.map = new google.maps.Map(this.mapEl.nativeElement, mapOpt);
    this.addMarker(geoLoc, this.map)
  }

  addMarker (position, map) {
    return new google.maps.Marker({
      position,
      map
    });
  }

}
