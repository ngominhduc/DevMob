import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { ShowlistPage } from "../showlist/showlist";
import { SharelistPage } from '../sharelist/sharelist';
import { NotificationPage } from "../notification/notification";

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  openTask() {
    this.navCtrl.push(ShowlistPage);
  }

  notification(){
    this.navCtrl.push(NotificationPage);
  }

  sharelist(){
    this.navCtrl.push(SharelistPage);
  }
}
