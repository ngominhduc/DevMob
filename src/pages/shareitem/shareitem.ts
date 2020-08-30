import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TodoItem } from '../../model/TodoItem';
import { Observable } from 'rxjs';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { ShareitemProvider } from '../../providers/shareitem/shareitem';

/**
 * Generated class for the ShareitemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shareitem',
  templateUrl: 'shareitem.html',
})
export class ShareitemPage {

  listId: string;
  listName: string;
  items: Observable<TodoItem[]>;
  name: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public itemProvider: ShareitemProvider,
    private photoViewer: PhotoViewer) {
    this.listId = navParams.get('id');
    this.listName = navParams.get('name');
    this.getListItems(this.listId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShareitemPage');
  }

  viewPhoto(url) {
    console.log('view image');
    this.photoViewer.show(url);
  }

  getListItems(listUUID: string) {
    this.items = this.itemProvider.getItemsList(listUUID);
  }

  addItem(){
    this.addModal();
  }

  addModal() {
    const modal = this.modalCtrl.create('ItemModalPage');
    modal.present();
    modal.onDidDismiss((data: TodoItem) => {
      this.itemProvider.insertItem(this.listId,data);
    });
  }

  updateModal(id : any, item:TodoItem) {
    console.log("update item id" + id);
    const modal = this.modalCtrl.create('ItemModalPage',{item: item});
    modal.present();
    modal.onDidDismiss(data => {
      console.log('update'+ id);
      this.itemProvider.updateItem(id, data);
    });
  }

  delete(uuid){
    this.itemProvider.deleteItem(uuid);
  }

}