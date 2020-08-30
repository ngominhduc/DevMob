import { NgModule } from '@angular/core';
import { IonicPageModule, IonicApp } from 'ionic-angular';
import { DashboardPage } from './dashboard';
import { ItemProvider } from '../../providers/item/item';
import { ListProvider } from '../../providers/list/list';
import { AddimageProvider } from '../../providers/addimage/addimage';

@NgModule({
  declarations: [
    DashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(DashboardPage),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
  ],
  providers: [
    ItemProvider,
    ListProvider,
    AddimageProvider,
  ]
})

export class DashboardPageModule {}
