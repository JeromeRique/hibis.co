import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VendorDetailsPage } from './vendor-details';

@NgModule({
  declarations: [
    VendorDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(VendorDetailsPage),
  ],
})
export class VendorDetailsPageModule {}
