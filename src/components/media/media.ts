import { Component, Input } from '@angular/core';

import { ITweetEntitiesMedia } from './../../reducers';
/**
 * Generated class for the MediaComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'media',
  templateUrl: 'media.html'
})
export class MediaComponent {

  @Input() 'data': ITweetEntitiesMedia;

  constructor() {
    console.log('Hello MediaComponent Component');
  } 

}
 