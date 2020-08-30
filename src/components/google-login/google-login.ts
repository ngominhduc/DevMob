import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/Observable';
import { Platform, NavController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import {DashboardPage} from "../../pages/dashboard/dashboard";

/**
 * Generated class for the GoogleLoginComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'google-login',
  templateUrl: 'google-login.html'
})


export class GoogleLoginComponent {
  user: Observable<firebase.User>;
  displayName: any;
  email: any;
  familyName: any;
  givenName: any;
  userId: any;
  imageUrl: any;
  isLoggedIn:boolean = false;
  constructor(private afAuth: AngularFireAuth,
    private gplus: GooglePlus,
    private platform: Platform,
    private nav: NavController) {

    this.user = this.afAuth.authState;

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
    this.gplus.login({})
    .then(res => {
      console.log(res);
      this.displayName = res.displayName;
      this.email = res.email;
      this.familyName = res.familyName;
      this.givenName = res.givenName;
      this.userId = res.userId;
      this.imageUrl = res.imageUrl;
      this.isLoggedIn = true;
    })
    .catch(err => console.error(err));
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await this.afAuth.auth.signInWithPopup(provider).then(data => {
        setTimeout('', 3000);
        this.nav.setRoot(DashboardPage);
        console.log(data.user.photoURL);
        console.log(data.user.displayName);
        console.log(data.user.email);
      });
    } catch (err) {
      console.log(err)
    }
  }

  signOut() {
    this.afAuth.auth.signOut();
  }
}
