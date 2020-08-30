import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, Nav } from 'ionic-angular';
import { TabsPage } from "../tabs/tabs";
import { ProfilPage } from "../profil/profil";
import { AngularFireAuth} from "@angular/fire/auth";
import { ShowlistPage } from '../showlist/showlist';
import { Observable } from "rxjs";
import * as firebase from 'firebase/app';



/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface PageInterface {
  title: string;
  pageName: any;
  tabComponent?: any;
  index?: number;
  icon: string;
  display?: boolean;
}

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  // Basic root for our content view
  rootPage = TabsPage;
  //user connnected
  user: Observable<firebase.User>;

  // Reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  pages: PageInterface[] = [
    { title: 'Tasks', pageName: ShowlistPage, tabComponent: 'TodoListPage', index: 1, icon: 'list', display: true},
    { title: 'Profil', pageName: ProfilPage, tabComponent: 'ProfilPage', index: 2, icon: 'person', display: true},
  ];

  constructor(public navCtrl: NavController,private afAuth: AngularFireAuth) {
    this.user = this.afAuth.authState;
  }


  openPage(page: PageInterface) {
    let params = {};

    // The index is equal to the order of our tabs inside tabs.ts
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // The active child nav is our Tabs Navigation
    if (this.nav.getActiveChildNav() && page.index != undefined) {
      this.nav.getActiveChildNav().select(page.index);
    } else {
      // Tabs are not active, so reset the root page
      // In this case: moving to or from SpecialPage
      this.nav.push(page.pageName, params);
    }
  }

  isActive(page: PageInterface) {
    // Again the Tabs Navigation
    let childNav = this.nav.getActiveChildNav();

    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    // Fallback needed when there is no active childnav (tabs not active)
    if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return 'primary';
    }
    return;
  }

  logout(){
    this.afAuth.auth.signOut().then(function() {
    }, function(error) {
      console.log(error);
    });
  }

}
