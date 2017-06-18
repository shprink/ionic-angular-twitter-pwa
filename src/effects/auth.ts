import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { TwitterProvider } from './../providers';
import { addCurrentTwitterUser } from './../actions';

@Injectable()
export class AuthEffects {
  constructor(
    private twitterProvider: TwitterProvider,
    private actions$: Actions,
  ) {}

  @Effect() login$ = this.actions$
    .ofType('LOGIN')
    // Map the payload into JSON to use as the request body
    .map(action => JSON.stringify(action.payload))
    .debounceTime(100)
    .switchMap(action =>
      this.twitterProvider
        .getUser$()
        .first()
        .map(user => addCurrentTwitterUser(user))
        .catch(() => Observable.of({ type: 'LOGIN_FAILED' })),
    );
}
