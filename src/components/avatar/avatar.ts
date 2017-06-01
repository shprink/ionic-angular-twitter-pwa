import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, IUser } from '../../reducers';
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
  user$: Observable<IUser>

  constructor(
    public store: Store<AppState>,
  ) {
    this.user$ = this.store.select(state => state.auth.user);
  }

}
