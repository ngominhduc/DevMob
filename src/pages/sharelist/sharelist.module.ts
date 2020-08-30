import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharelistPage } from './sharelist';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@NgModule({
  declarations: [
    SharelistPage,
  ],
  imports: [
    IonicPageModule.forChild(SharelistPage),
  ],
  providers: [
    BarcodeScanner,
  ]
})
export class SharelistPageModule {}
