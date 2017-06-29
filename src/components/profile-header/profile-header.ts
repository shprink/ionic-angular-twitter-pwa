import { Component, Input } from '@angular/core';

import { ITwitterUser } from './../../reducers';

/**
 * Generated class for the ProfileHeaderComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'profile-header',
  templateUrl: 'profile-header.html'
})
export class ProfileHeaderComponent {
  @Input() user: ITwitterUser;

  constructor() { }
}
