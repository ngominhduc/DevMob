import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Platform } from 'ionic-angular';
import {TodoItem} from "../../model/TodoItem";
/*
  Generated class for the LocalnotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocalnotificationProvider {
  count : any = 3;
  constructor(
    public http: HttpClient,
    public localNotifications: LocalNotifications,
    private platform: Platform) {
    console.log('Hello LocalnotificationProvider Provider');
  }

  scheduleNotification() {
    alert(new Date().getTime());
    this.localNotifications.schedule({
      id: 1,
      title: 'New task to come',
      text: 'You have to do ',
      sound: this.setSound(),
      trigger: { at: new Date(new Date().getTime() + 5 * 1000) },
      data: { mydata: 'my hidden message ' }
    });
  }

  pickNotification(item: TodoItem) {
    this.localNotifications.schedule({
      id: 2,
      title: 'New task to come',
      text: 'You have to do '+item.name,
      sound: this.setSound(),
      trigger: { at: item.dateNotif },
      data: { mydata: 'my hidden message' }
    });
  }

  selectnotification(date: Date, titre : string, text : string){
    this.count = this.count + 1;
    this.localNotifications.schedule({
      id: this.count,
      title: titre,
      text: text,
      sound: this.setSound(),
      trigger: { at: new Date(date) },
      data: { mydata: 'a message' }
    });
  }

  setSound() {
    if (this.platform.is('android')) {
      return 'file://assets/sounds/Rooster.mp3'
    } else {
      return 'file://assets/sounds/Rooster.caf'
    }
  }
}
