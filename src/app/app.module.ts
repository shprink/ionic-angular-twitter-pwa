import { SharedLazyModule } from './shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Storage } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';

import { MyApp } from './app.component';
import { STORE } from '../store';
import { StorageProvider } from '../providers/storage/storage';
import { TwitterProvider } from '../providers/twitter/twitter';

export function provideStorage() {
  return new Storage({ name: '__twitter-pwa' });
}

export function appInitializerStorageFactory(storage: StorageProvider) {
  return function () {
    return storage.init();
  };
};

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAVDXvCWcmED4zI4LmAMlVJr21ul7z5DyQ",
      authDomain: "ionic-twitter-pwa.firebaseapp.com",
      databaseURL: "https://ionic-twitter-pwa.firebaseio.com",
      projectId: "ionic-twitter-pwa",
      storageBucket: "ionic-twitter-pwa.appspot.com",
      messagingSenderId: "635051733996"
    }),
    ...STORE,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    AngularFireAuth,
    { provide: Storage, useFactory: provideStorage },
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    StorageProvider,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerStorageFactory,
      deps: [StorageProvider],
      multi: true
    },
    TwitterProvider
  ]
})
export class AppModule { }
