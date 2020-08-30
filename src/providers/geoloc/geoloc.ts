import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the GeolocProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeolocProvider {

  locationData: any;
  responseObj: any;
  map: any;
  
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  constructor(
    public http: HttpClient,
    public geolocation: Geolocation,
    public nativeGeocoder: NativeGeocoder,
    public loadingCtrl: LoadingController,
  ) {
    this.responseObj = {
      latitude: 0,
      longitude: 0,
      accuracy: 0,
      address: ""
    };
  }

  geolocalisation() {
    return this.geolocation.getCurrentPosition().then((resp) => {
      this.responseObj = resp.coords;
      console.log("step 3", this.getGeoencoder(this.responseObj.latitude, this.responseObj.longitude));
      return this.locationData = this.getGeoencoder(this.responseObj.latitude, this.responseObj.longitude);
    }).then(function(result) {
      console.log("step 4", result);
      return result;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    //return this.locationData;
  }

  getGeoencoder(latitude, longitude) {
    return this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then((result: NativeGeocoderReverseResult[]) => {
        return this.responseObj.address = this.generateAddress(result[0]);
      }).then(function(result) {
        console.log("step2", result);
        return result;
      })
      .catch((error: any) => {
        alert('Error getting location'+ JSON.stringify(error));
      });
    //return this.responseObj.address;
  }

  /*
  geolocalisation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.responseObj = resp.coords;
      this.locationData = this.getGeoencoder(this.responseObj.latitude, this.responseObj.longitude);
      //this.locationData = '(latitude = ' + resp.coords.latitude + ' - longitude = ' + resp.coords.longitude + ')';
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });

    return this.locationData;
  }

  getGeoencoder(latitude, longitude) {
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then((result: NativeGeocoderReverseResult[]) => {
        this.responseObj.address = this.generateAddress(result[0]);
        console.log("get adress",this.responseObj.address);
      })
      .catch((error: any) => {
        alert('Error getting location'+ JSON.stringify(error));
      });
    return this.responseObj.address;
  }*/

  generateAddress(addressObj){
    let obj = [];
      let address = "";
      for (let key in addressObj) {
        obj.push(addressObj[key]);
      }
      obj.reverse();
      for (let val in obj) {
        if(obj[val].length)
        address += obj[val]+', ';
      }
    return address.slice(0, -2);
  }
}