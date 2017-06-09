import { Observable } from 'rxjs/Observable';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { NgServiceWorker } from '@angular/service-worker';

import { StorageProvider, AuthProvider } from '../providers';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  isMenuEnabled$: Observable<boolean>;
  rootPage: any = 'HomePage';
  previousAuthState: boolean;

  constructor(
    public platform: Platform,
    public storageProvider: StorageProvider,
    public authProvider: AuthProvider,
    public sw: NgServiceWorker,
  ) {
    this.isMenuEnabled$ = this.authProvider.isAuthenticated$();

    this.platform.ready().then(() => {
      this.storageProvider.run();
      this.authProvider.run();
      this.authProvider.isAuthenticated$().debounceTime(100).subscribe(isAuthenticated => {
        if (this.previousAuthState !== isAuthenticated) {
          console.log('isAuthenticated', isAuthenticated, )

          if (isAuthenticated && !location.hash.includes('home')) {
            this.nav.setRoot('HomePage');
          } else if (!isAuthenticated && !location.hash.includes('login')) {
            this.nav.setRoot('LoginPage');
          }
        }
        this.previousAuthState = isAuthenticated;
      });
      this.sw.log().subscribe(logs => console.log('service-worker logs', logs));
      this.sw.updates.subscribe(res => {
        console.log('service-worker updates', res);
      });
    });
  }
}
