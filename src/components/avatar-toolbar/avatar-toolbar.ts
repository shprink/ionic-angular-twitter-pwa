import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';

/**
 * Generated class for the AvatarToolbarComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'avatar-toolbar',
  templateUrl: 'avatar-toolbar.html'
})
export class AvatarToolbarComponent {

  constructor(
    public menuCtrl: MenuController
  ) {
    console.log('Hello AvatarToolbarComponent Component');
  }

  openMenu() {
    this.menuCtrl.open();
  }

}
