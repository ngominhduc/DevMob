import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free';
/*
  Generated class for the MonetisationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MonetisationProvider {

  constructor(
    public http: HttpClient,
    private admobFree: AdMobFree
    ) {
    console.log('Hello MonetisationProvider Provider');
  }

  showBannerAd(){
    const bannerConfig: AdMobFreeBannerConfig = {
      // add your config here
      // for the sake of this example we will just use the test config
      //id:'ca-app-pub-3364360504910688/9242326120',
      isTesting: true,
      autoShow: true
     };
     this.admobFree.banner.config(bannerConfig);
     this.admobFree.banner.prepare()
       .then(() => {
         // banner Ad is ready
         // if we set autoShow to false, then we will need to call the show method here
         console.log("ad show ");
       })
       .catch(e => console.log(e));
       console.log("ad show sucess");
  }


  showInterstitialAds(){
    let interstitialConfig: AdMobFreeInterstitialConfig = {
      //id: "ca-app-pub-3364360504910688/3878937356",
      isTesting: true, // Remove in production
      autoShow: true
    };
    this.admobFree.interstitial.config(interstitialConfig);
    this.admobFree.interstitial.prepare().then(() => {
    }).catch(e => alert(e));
  }

  showRewardVideoAds(){
    let RewardVideoConfig: AdMobFreeRewardVideoConfig = {
      //id: "ca-app-pub-3364360504910688/6408542552",
      isTesting: true, // Remove in production
      autoShow: true
    };
    this.admobFree.rewardVideo.config(RewardVideoConfig);
    this.admobFree.rewardVideo.prepare().then(() => {
    }).catch(e => alert(e));
  }
}
