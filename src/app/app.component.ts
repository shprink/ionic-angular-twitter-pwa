import { Observable } from 'rxjs/Observable';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';

import { StorageProvider, AuthProvider, ServiceWorkerProvider } from '../providers';

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
    public swProvider: ServiceWorkerProvider,
  ) {
    this.isMenuEnabled$ = this.authProvider.isAuthenticated$();

    this.platform.ready().then(() => {
      this.storageProvider.run();
      this.authProvider.run();
      this.swProvider.run();
      this.authProvider.isAuthenticated$().debounceTime(100).subscribe(isAuthenticated => {
        if (this.previousAuthState !== isAuthenticated) {
          console.log('isAuthenticated', isAuthenticated, )

          if (isAuthenticated && (location.hash === "" || location.hash.includes('login'))) {
            this.nav.setRoot('HomePage');
          } else if (!isAuthenticated && !location.hash.includes('login')) {
            this.nav.setRoot('LoginPage');
          }
        }
        this.previousAuthState = isAuthenticated;
      });
    });
  }
}
