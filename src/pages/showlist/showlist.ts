import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, ToastController} from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { ListProvider } from '../../providers/list/list';
import { Observable } from 'rxjs';
import { TodoList } from '../../model/TodoList';
import * as firebase from 'firebase/app';
import { ShowitemPage } from '../showitem/showitem';

/**
 * Generated class for the ShowlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showlist',
  templateUrl: 'showlist.html',
})
export class ShowlistPage {

  dataList: Observable<TodoList[]>;
  test:any;
  currentUser = firebase.auth().currentUser;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    public listProvider: ListProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {
    this.dataList = this.listProvider.getList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowlistPage', this.afAuth.auth.currentUser.email, this.currentUser = firebase.auth().currentUser);
  }

  listSelected(id: any, name: string) {
    console.log('select' + id);
    this.navCtrl.push(ShowitemPage, { id: id , name: name});
    console.log('select done');
  }

  deleteList(id: any) {
    console.log('delete');
    this.deleteConfirm(id);
  }

  updateList(id: any) {
    console.log('update' + id);
    this.update(id);
  }

  addList(): any {
    const prompt = this.alertCtrl.create({
      title: 'Add new list',
      inputs: [
        {
          name: 'name',
          placeholder: 'name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            if( data.name.length === 0) {
              const toast = this.toastCtrl.create({
                message: 'Name cannot be empty',
                duration: 2000
              });
              toast.present();
            } else {
              if (this.currentUser) {
                data.email = this.currentUser.email;
                data.uuid = this.currentUser.uid;
                data.imgURL = "https://firebasestorage.googleapis.com/v0/b/tpdm-c2652.appspot.com/o/images.jpg?alt=media&token=ccf758f6-3b5c-440e-ac79-b5c4e7ff1de3";
              }
              else {
                data.imgURL = "https://firebasestorage.googleapis.com/v0/b/tpdm-c2652.appspot.com/o/images.jpg?alt=media&token=ccf758f6-3b5c-440e-ac79-b5c4e7ff1de3";
              }
              this.listProvider.insertList(data);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  deleteConfirm(id: any): any {
    let alert = this.alertCtrl.create({
      title: 'Are you sure to want remove this list ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.listProvider.deleteList(id);
          }
        }
      ]
    });
    alert.present();
  }

  update(id: any) {
    const prompt = this.alertCtrl.create({
      title: 'Enter list name',
      inputs: [
        {
          name: 'name',
          placeholder: 'name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Ok',
          handler: data => {
            if( data.name.length === 0) {
              const toast = this.toastCtrl.create({
                message: 'Name cannot be empty',
                duration: 2000
              });
              toast.present();
            } else {
              this.listProvider.updateList(id, data.name);
            }
          }
        }
      ]
    });
    prompt.present();
  }

}
