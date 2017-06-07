import { Component, Input } from '@angular/core';

import { ITwitterUser } from '../../reducers';

/**
 * Generated class for the CoverComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'cover',
  templateUrl: 'cover.html'
})
export class CoverComponent {
  @Input() user: ITwitterUser;
  @Input() onAvatarClick: (e) => void;

  constructor() { }

}
