import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { AuthProvider } from '../../providers';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  platforms: string[];
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public authProvider: AuthProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  // ionViewCanEnter(): Promise<boolean> {
  //   return new Promise((resolve, reject) => {
  //     const canEnter = !this.authProvider.isAuthenticated();
  //     console.log('login canEnter', canEnter)
  //     if (!canEnter) {
  //       this.goToHomePage();
  //     }
  //     resolve(canEnter);
  //   });
  // }

  ionViewCanLeave(): boolean {
    console.log('login ionViewCanLeave', this.authProvider.isAuthenticated())
    return this.authProvider.isAuthenticated();
  }

  login() {
    this.authProvider.login();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
