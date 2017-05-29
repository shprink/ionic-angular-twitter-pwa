import { Component } from '@angular/core';

/**
 * Generated class for the MessageFabComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'message-fab',
  templateUrl: 'message-fab.html'
})
export class MessageFabComponent {

  text: string;

  constructor() {
    console.log('Hello MessageFabComponent Component');
    this.text = 'Hello World';
  }

}
