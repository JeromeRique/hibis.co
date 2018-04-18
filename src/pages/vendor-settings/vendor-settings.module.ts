import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VendorSettingsPage } from './vendor-settings';

@NgModule({
  declarations: [
    VendorSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(VendorSettingsPage),
  ],
})
export class VendorSettingsPageModule {}
