import { Injectable } from '@angular/core';

import { TwitterProvider } from './../twitter/twitter';
/*
  Generated class for the SearchProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SearchProvider {

  constructor(public twitter: TwitterProvider) {
    console.log('Hello SearchProvider Provider');
  }

  search$(q) {
    
  }

}
