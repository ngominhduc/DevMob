import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { Observable } from "rxjs";
import { TodoList } from "../../model/TodoList";
import { HttpClient } from "@angular/common/http";
import { AngularFirestore } from "angularfire2/firestore";

/*
  Generated class for the AddimageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AddimageProvider {

  test: any;
  geturl: any;
  list: Observable<TodoList[]>;
  database = firebase.database();
  user = firebase.auth().currentUser;

  constructor(public http: HttpClient, public angularFire: AngularFirestore) {
  }

  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux: any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;

  };

  async uploadImage(imageURI, url_img) {

    return await new Promise<String>(async (resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('image').child(url_img);

      this.encodeImageUri(imageURI, function (image64) {
        imageRef.putString(image64, 'data_url')
          .then(snapshot => {
            //resolve(snapshot.downloadURL);
          }, err => {
            alert("upload error");
            reject(err);
          })
      })

      this.geturl = await imageRef.getDownloadURL()
        .then(
          response => {
            this.test = response;
            console.log("get url promise", this.test);
            resolve(response);
          })
        .catch(error => console.log('error', error));
      console.log("get URL from upload", this.test);
    })
  }

  async uploadImageItems(imageURI, id) {
    console.log("this image name = ", id);
    return await new Promise<String>(async (resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('image').child(id);

      await this.encodeImageUri(imageURI, function (image64) {
        imageRef.putString(image64, 'data_url')
          .then(snapshot => {
            resolve(snapshot.downloadURL);
          }, err => {
            alert("upload error");
            reject(err);
          })
      })

    })
  }

  async getURLimage(id) {
    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child('image').child(id);
    this.geturl = await imageRef.getDownloadURL()
      .then(
        response => {
          this.test = response;
          console.log("get url promise", this.test);
        })
      .catch(error => console.log('error', error));
    console.log("get URL from upload", this.test);
    console.log("function get URL", this.test);
    return this.test;
  }
}
