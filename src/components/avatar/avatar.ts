import { Component, Input } from '@angular/core';

import { ITwitterUser } from './../../reducers';
/**
 * Generated class for the AvatarComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'avatar',
  templateUrl: 'avatar.html'
})
export class AvatarComponent {
  @Input() 'user': ITwitterUser;
  @Input() 'size': string = 'normal'; // mini, normal or bigger
  profile_image: string;

  constructor() { }

  ngOnChanges(changes: any) {
    if (changes.user.currentValue && changes.user.currentValue !== changes.user.previousValue) {
      this.profile_image = changes.user.currentValue.profile_image_url_https.replace('normal', this.size);
    }
  }

}

