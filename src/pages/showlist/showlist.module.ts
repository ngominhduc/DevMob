import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowlistPage } from './showlist';

@NgModule({
  declarations: [
    ShowlistPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowlistPage),
  ],
})
export class ShowlistPageModule {}
