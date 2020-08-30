import { Component } from '@angular/core';
import { DashboardPage } from "../dashboard/dashboard";
import { NavParams } from "ionic-angular";
import { AlertsPage } from "../alerts/alerts";
import { ProfilPage } from "../profil/profil";
import { ShowlistPage } from '../showlist/showlist';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = DashboardPage;
  tab2Root = ShowlistPage;
  tab3Root = AlertsPage;
  tab4Root = ProfilPage;

  myIndex: number;

  constructor(navParams: NavParams) {
    // Set the active tab based on the passed index from menu.ts
    this.myIndex = navParams.data.tabIndex || 0;
  }
}
