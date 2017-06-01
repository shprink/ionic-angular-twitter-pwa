import { Observable } from 'rxjs/Observable';

import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController } from 'ionic-angular';

import { StorageProvider } from '../providers/storage/storage';
import { TwitterProvider } from '../providers/twitter/twitter';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  isMenuEnabled$: Observable<boolean>;
  rootPage: any = 'HomePage';

  constructor(
    public platform: Platform,
    public storage: StorageProvider,
    public twitter: TwitterProvider,
    public modalCtrl: ModalController,
  ) {
    this.isMenuEnabled$ = this.twitter.isAuthenticated();

    this.platform.ready().then(() => {
      this.storage.run();
      this.twitter.isAuthenticated().debounceTime(100).subscribe(isAuthenticated => {
        console.log('isAuthenticated', isAuthenticated)
        if (isAuthenticated) return;

        let loginModal = this.modalCtrl.create('LoginPage')
        loginModal.onDidDismiss(data => this.nav.setRoot('HomePage'));
        loginModal.present();
      });
    });
  }
}
