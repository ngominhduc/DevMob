import {NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ShowlistPageModule } from '../pages/showlist/showlist.module';
import { LoginPageModule } from '../pages/login/login.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { GooglePlus } from '@ionic-native/google-plus';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AngularFirestoreModule, FirestoreSettingsToken } from 'angularfire2/firestore';
import { ImagePicker } from '@ionic-native/image-picker';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { FirebaseService } from '../pages/service/firebase.service';
import { Base64 } from '@ionic-native/base64';
import { LoginPage } from '../pages/login/login';
import { AdMobFree } from '@ionic-native/admob-free';
import { MonetisationProvider } from '../providers/monetisation/monetisation';
import { AddimageProvider } from '../providers/addimage/addimage';
import { ListProvider } from '../providers/list/list';
import { GoogleloginProvider } from '../providers/googlelogin/googlelogin';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { GeolocProvider } from '../providers/geoloc/geoloc';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { SpeechRecoProvider } from '../providers/speech-reco/speech-reco';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { LocalnotificationProvider } from '../providers/localnotification/localnotification';
import { MenuPage } from "../pages/menu/menu";
import { DashboardPage } from "../pages/dashboard/dashboard";
import { AlertsPage } from "../pages/alerts/alerts";
import { ProfilPage } from "../pages/profil/profil";
import { ItemProvider } from '../providers/item/item';
import { ShowitemPageModule } from '../pages/showitem/showitem.module';
import { SharelistProvider } from '../providers/sharelist/sharelist';
import { SharelistPage } from '../pages/sharelist/sharelist';
import { SharelistPageModule } from '../pages/sharelist/sharelist.module';
import { PhotoViewer } from "@ionic-native/photo-viewer";
import { DatePicker } from "@ionic-native/date-picker";
import { ShareitemProvider } from '../providers/shareitem/shareitem';
import { ShareitemPageModule } from '../pages/shareitem/shareitem.module';
import {NotificationPage} from "../pages/notification/notification";

const firebaseConfig = {
  fire :{
    apiKey: 'AIzaSyCLeQxZ78r5AzywGZU7Hlpj-VoRZgQHR6Y',
    authDomain: 'tpdm-c2652.firebaseapp.com',
    databaseURL: 'https://tpdm-c2652.firebaseio.com/',
    projectId: 'tpdm-c2652',
    storageBucket: 'tpdm-c2652.appspot.com'
  }
}

@NgModule({
  declarations: [
    MyApp,
    MenuPage,
    DashboardPage,
    AlertsPage,
    ProfilPage,
    TabsPage,
    NotificationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ShowlistPageModule,
    ShowitemPageModule,
    AngularFireModule.initializeApp(firebaseConfig.fire),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    LoginPageModule,
    SharelistPageModule,
    ShareitemPageModule,
    HttpModule,
    HttpClientModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MenuPage,
    DashboardPage,
    AlertsPage,
    ProfilPage,
    TabsPage,
    LoginPage,
    SharelistPage,
    NotificationPage
  ],
  providers: [
    DatePicker,
    PhotoViewer,
    GooglePlus,
    ListProvider,
    AddimageProvider,
    ItemProvider,
    StatusBar,
    SplashScreen,
    ImagePicker,
    FirebaseService,
    AdMobFree,
    Base64,
    Geolocation,
    NativeGeocoder,
    SpeechRecognition,
    LocalNotifications,
    { provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: FirestoreSettingsToken, useValue: {} },
    MonetisationProvider,
    GoogleloginProvider,
    GeolocProvider,
    SpeechRecoProvider,
    LocalnotificationProvider,
    SharelistProvider,
    ShareitemProvider
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule {}
