import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

/**
 * Generated class for the TweetFabComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'tweet-fab',
  templateUrl: 'tweet-fab.html'
})
export class TweetFabComponent {

  constructor(
    private modalCtrl: ModalController
  ) {
    console.log('Hello TweetFabComponent Component');
  }

  createTweet() {
    let tweetModal = this.modalCtrl.create('TweetPage')
    // loginModal.onDidDismiss( data => this.nav.setRoot('HomePage'));
    tweetModal.present();
  }
 
}
