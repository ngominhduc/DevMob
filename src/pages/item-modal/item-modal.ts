import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, normalizeURL } from 'ionic-angular';
import { TodoItem } from '../../model/TodoItem';
import { ImagePicker } from '@ionic-native/image-picker';
import { AddimageProvider } from '../../providers/addimage/addimage';
import { GeolocProvider } from '../../providers/geoloc/geoloc';
import { SpeechRecoProvider } from '../../providers/speech-reco/speech-reco';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatePicker } from '@ionic-native/date-picker';

/**
 * Generated class for the ItemModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-modal',
  templateUrl: 'item-modal.html',
})
export class ItemModalPage {
  locationData: any;
  speechText: any;
  imgURL: any;
  showimage: String;
  randomimageurl: any;
  todo: TodoItem = { uuid: "", name: "", desc: "", adress: "", speechText: "", imgURL: "", complete: false };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public imagePicker: ImagePicker,
    public toastCtrl: ToastController,
    public addimage: AddimageProvider,
    public geolocation: GeolocProvider,
    public speechRecognition: SpeechRecoProvider,
    private datePicker: DatePicker
  ) {
    this.randomimageurl = Math.random().toString(16);
    if(typeof  this.navParams.get('item') !== "undefined") {
      this.todo = this.navParams.get('item');
    }
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemModalPage');
  }

  async geolocalisation() {
    this.locationData = await this.geolocation.geolocalisation();
    this.todo.adress = this.locationData;
  }

  async speechReco() {
    this.speechText = await this.speechRecognition.startListening();
    this.todo.speechText = this.speechText;
    console.log("final speech", this.speechText);
  }

  ajoutImage() {
    this.imagePicker.hasReadPermission().then(
      (result) => {
        if (result == false) {
          // no callbacks required as this opens a popup which returns async
          this.imagePicker.requestReadPermission();
        }
        else if (result == true) {
          this.imagePicker.getPictures({
            maximumImagesCount: 1
          }).then(
            (results) => {
              for (var i = 0; i < results.length; i++) {
                this.uploadImageToFirebase(results[i], this.randomimageurl);
                this.todo.imgURL = results[i];
              }
            }, (err) => console.log(err)
          );
        }
      }, (err) => {
        console.log(err);
      });
  }

  confirmAjoutimage() {
    this.imagePicker.getPictures({
      maximumImagesCount: 1
    }).then(
      (results) => {
        this.uploadImageToFirebase(this.showimage, this.randomimageurl);
      }, (err) => console.log(err)
    );
  }

  async uploadImageToFirebase(image, itemID) {
    image = await normalizeURL(image);

    //uploads img to firebase storage
    await this.addimage.uploadImageItems(image, itemID)
      .then(photoURL => {
        let toast = this.toastCtrl.create({
          message: 'Image was updated successfully',
          duration: 3000
        });
        toast.present();
      })

    this.imgURL = await this.addimage.getURLimage(itemID);
    this.todo.imgURL = this.imgURL;
    console.log("return ", this.todo.imgURL);
    console.log("update image sucess");
  }

  dismiss(todo: TodoItem) {
    this.viewCtrl.dismiss(todo);
  }

  addNotification() {
    this.datePicker.show({
      date: new Date(),
      mode: 'datetime',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {
        this.todo.dateNotif = date;
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  submit(todo: TodoItem) {
    this.dismiss(this.todo);
  }
}
