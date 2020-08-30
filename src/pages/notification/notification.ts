import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { LocalnotificationProvider } from "../../providers/localnotification/localnotification";

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  constructor(public navCtrl: NavController,
              private notification: LocalnotificationProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }

  myDate: any;
  text: any;
  titre: any;


  selectNotification() {
    this.notification.selectnotification(this.myDate, this.titre, this.text);
  }

}
