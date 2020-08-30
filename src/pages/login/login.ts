import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/Observable';
import { Platform, NavController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { DashboardPage } from '../dashboard/dashboard';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})


export class LoginPage {
  user: Observable<firebase.User>;
  displayName: any;
  email: any;
  familyName: any;
  givenName: any;
  imageUrl: any;
  currentUser = firebase.auth().currentUser;

  constructor(private afAuth: AngularFireAuth,
    private gplus: GooglePlus,
    private platform: Platform,
    private nav: NavController
    ) {
    this.currentUser = firebase.auth().currentUser;
  }

  googleLogin() {
    if (this.platform.is('cordova')) {
      console.log("prepare android login");
      this.nativeGoogleLogin();
      console.log("done google login");
    } else {
      this.webGoogleLogin();
    }
  }

  async nativeGoogleLogin(): Promise<void> {

    try {
      const gplusUser = await this.gplus.login({
        'webClientId': '550807918239-5q246e2jsjd8am9ha6d6dneo039c82fs.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      })

      return await this.afAuth.auth.signInAndRetrieveDataWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)).then(data => {
        setTimeout('', 3000);
        this.displayName = data.user.displayName;
        this.email = data.user.email;
        alert("welcome " + data.user.displayName);
        console.log("login information", this.displayName, this.email);
        this.nav.push(DashboardPage);
      });
    } catch (err) {
      console.log(err)
    }

  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider).then(data => {
        setTimeout('', 3000);
        this.email = data.user.email;
        console.log(data.user.photoURL);
        console.log(data.user.displayName);
        console.log(data.user.email);
        alert("welcome " + data.user.displayName);
        this.nav.push(DashboardPage);
      });
    } catch (err) {
      console.log(err)
    }
  }

}
