import { BrowserModule } from '@angular/platform-browser';
import {
  ErrorHandler,
  NgModule,
  APP_INITIALIZER,
  Injector,
} from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { Network } from '@ionic-native/network';

import 'javascript-time-ago/intl-messageformat-global';
import 'intl-messageformat/dist/locale-data/en';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/finally';

import { MyApp } from './app.component';
import { STORE } from '../store';
import {
  StorageProvider,
  TwitterProvider,
  UsersProvider,
  FeedProvider,
  AuthProvider,
  TrendsProvider,
  ServiceWorkerProvider,
  SearchProvider,
  MentionsProvider,
  TweetProvider,
  UserTweetsProvider,
  UserLikesProvider,
} from '../providers';
import { MenuComponentModule } from '../components/menu/menu.module';
import { HttpWrapper } from './http.wrapper';

export function provideStorage() {
  return new Storage({ name: '__twitter-pwa' });
}

export function appInitializerStorageFactory(storage: StorageProvider) {
  return () => storage.init();
}

export function provideHttp(
  xhrBackend: XHRBackend,
  requestOptions: RequestOptions,
  authProvider: AuthProvider,
  injector: Injector,
): Http {
  return new HttpWrapper(xhrBackend, requestOptions, authProvider, injector);
}

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      iconMode: 'md',
      mode: 'md'
    }),
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyAVDXvCWcmED4zI4LmAMlVJr21ul7z5DyQ',
      authDomain: 'ionic-twitter-pwa.firebaseapp.com',
      databaseURL: 'https://ionic-twitter-pwa.firebaseio.com',
      projectId: 'ionic-twitter-pwa',
      storageBucket: 'ionic-twitter-pwa.appspot.com',
      messagingSenderId: '635051733996',
    }),
    ...STORE,
    MenuComponentModule,
    ServiceWorkerModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    { provide: Storage, useFactory: provideStorage },
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    {
      provide: Http,
      useFactory: provideHttp,
      deps: [XHRBackend, RequestOptions, AuthProvider, Injector],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerStorageFactory,
      deps: [StorageProvider],
      multi: true,
    },
    AngularFireAuth,
    StorageProvider,
    UsersProvider,
    FeedProvider,
    AuthProvider,
    TwitterProvider,
    TrendsProvider,
    ServiceWorkerProvider,
    SearchProvider,
    MentionsProvider,
    TweetProvider,
    UserTweetsProvider,
    UserLikesProvider,
    Network,
  ],
})
export class AppModule { }
