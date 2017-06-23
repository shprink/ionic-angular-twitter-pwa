import { Component, Input } from '@angular/core';

import { ITweetEntitiesUrl } from './../../reducers';
/**
 * Generated class for the OgComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'og',
  templateUrl: 'og.html'
})
export class OgComponent {

  // @Input() 'data': ITweetEntitiesMedia;

  constructor() {
    console.log('Hello OgComponent Component');
  }

}
