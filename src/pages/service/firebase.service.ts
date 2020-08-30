import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import * as firebase from 'firebase/app';
import 'firebase/storage';


@Injectable()
export class FirebaseService {
  test:any;
  constructor(){}

encodeImageUri(imageUri, callback) {
  var c = document.createElement('canvas');
  var ctx = c.getContext("2d");
  var img = new Image();
  img.onload = function () {
    var aux:any = this;
    c.width = aux.width;
    c.height = aux.height;
    ctx.drawImage(img, 0, 0);
    var dataURL = c.toDataURL("image/jpeg");
    callback(dataURL);
  };
  img.src = imageUri;
  console.log(img.src);
};

uploadImage(imageURI, url_img){
  return new Promise<any>((resolve, reject) => {
    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child('image').child('zzz');
    this.test = imageRef.getDownloadURL().then(function(url) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function(event) {
        var blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();
      console.log("xhr",xhr);
      console.log("url",url);
      this.url_img = url;
    }).catch(function(error) {
      // Handle any errors
    });

    console.log("getdownloadURL",this.test);
    this.encodeImageUri(imageURI, function(image64){
      imageRef.putString(image64, 'data_url')
      .then(snapshot => {
        resolve(snapshot.downloadURL)
      }, err => {
        reject(err);
      })
    })
  })
}

}
