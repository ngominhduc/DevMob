import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { TodoList } from '../../model/TodoList';
import { SharelistProvider } from '../../providers/sharelist/sharelist';
import { ShareitemPage } from '../shareitem/shareitem';
import { MonetisationProvider } from '../../providers/monetisation/monetisation';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the SharelistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sharelist',
  templateUrl: 'sharelist.html',
})
export class SharelistPage {

  data: Observable<TodoList[]>;
  user: any;
  currentuseremail: any;
  objectKeys: any = Object.keys;

  encodeData: any = {};
  scannedData: any;
  barcodeScannerOptions: BarcodeScannerOptions;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    private sharedlist: SharelistProvider,
    private pub : MonetisationProvider,
    private barcodeScanner: BarcodeScanner
  ) {
    this.data = this.sharedlist.getList();
    console.log(this.data);
    this.user = this.afAuth.auth.currentUser;
    if (this.afAuth.auth.currentUser) {
      this.currentuseremail = this.afAuth.auth.currentUser.email;
    }
    else {
      this.currentuseremail = "";
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SharedListPage');
    this.pub.showBannerAd();
    this.pub.showInterstitialAds();
    this.pub.showRewardVideoAds();
  }

  encodedText(listid : string) {
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, listid).then((data) => {
      this.encodeData = data;
      console.log(this.encodeData);
    }, (err) => {
      console.log("Error occured : " + err);
    });
  }

  async scanCode() {
    await this.barcodeScanner.scan(this.barcodeScannerOptions).then(data => {
      this.scannedData = data.text;
    }).catch(err => {
      console.log('Error', err);
    });

    console.log(this.scannedData);
  }

  listSelected(id: any) {
    console.log('select' + id);
    this.navCtrl.push(ShareitemPage , { id: id , name: name});
  }

  deleteList(id: any) {
    console.log('delete');
    this.deleteConfirm(id);
  }

  deletesharelist(id: any) {
    const prompt = this.alertCtrl.create({
      title: 'Delete user to shared list',
      inputs: [
        {
          name: 'shareto',
          placeholder: 'Person email',
        },
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
            this.sharedlist.deletesharedlist(id, data);
          }
        }
      ]
    });
    prompt.present();
  }

  sharelist(id: any) {
    const prompt = this.alertCtrl.create({
      title: 'Share this list to',
      message: "Entrez le nom de la liste",
      inputs: [
        {
          name: 'shareto',
          placeholder: 'email to share',
        },
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
            this.sharedlist.sharelist(id, data);
          }
        }
      ]
    });
    prompt.present();
  }

  updateList(id: any) {
    console.log('update' + id);
    this.update(id);
  }

  addList(): any {
    const prompt = this.alertCtrl.create({
      title: 'Enter new list',
      inputs: [
        {
          name: 'name',
          placeholder: 'name'
        },
        {
          name: 'shareto',
          placeholder: 'Email to share'
        }
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
            if (this.user) {
              data.email = this.user.email;
              data.uuid = this.user.uid;
            }
            else {
            }
            this.sharedlist.insertList(data);
          }
        }
      ]
    });
    prompt.present();
  }

  deleteConfirm(id: any): any {
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Are you sure to want to remove list?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel delete');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.sharedlist.deleteList(id);
          }
        }
      ]
    });
    alert.present();
  }

  update(id: any) {
    const prompt = this.alertCtrl.create({
      title: 'Update List',
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
            this.sharedlist.updateList(id, data);
          }
        }
      ]
    });
    prompt.present();
  }
}
