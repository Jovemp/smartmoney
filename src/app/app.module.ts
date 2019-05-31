import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { SQLite } from '@ionic-native/sqlite';
import { DatePicker } from '@ionic-native/date-picker';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { NewEntryPageModule } from '../pages/new-entry/new-entry.module';
import { ImagePreviewPageModule } from '../pages/image-preview/image-preview.module';
import { DatabaseProvider } from '../providers/database/database';
import { EntryDaoProvider } from '../providers/entry-dao/entry-dao';
import { CategoryDaoProvider } from '../providers/category-dao/category-dao';
import { AccountProvider } from '../providers/account/account';
import { ReportPageModule } from '../pages/report/report.module';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    NewEntryPageModule, 
    ComponentsModule,
    ReportPageModule,
    ImagePreviewPageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    DatePicker, 
    Geolocation, 
    NativeGeocoder,
    Camera, 
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    EntryDaoProvider,
    CategoryDaoProvider,
    AccountProvider
  ]
})
export class AppModule {}
