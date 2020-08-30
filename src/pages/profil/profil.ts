import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from "@angular/fire/auth";
import {LoginPage} from "../login/login";
import {Observable} from "rxjs";
import * as firebase from 'firebase/app';


/**
 * Generated class for the ProfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {

  user: Observable<firebase.User>;

  constructor(public navCtrl: NavController, public navParams: NavParams,private afAuth: AngularFireAuth) {
    this.user = this.afAuth.authState;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }

  signOut() {
    this.afAuth.auth.signOut().then(function() {
      alert("logout successful");
    }, function(error) {
      console.log(error);
    });
    this.navCtrl.setRoot(LoginPage);
  };
}
