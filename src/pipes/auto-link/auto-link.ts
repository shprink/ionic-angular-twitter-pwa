import { Pipe, PipeTransform } from '@angular/core';
import { autoLink } from 'twitter-text';

/**
 * Generated class for the AutoLinkPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'autoLink',
})
export class AutoLinkPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return autoLink(value || '', { 
      hashtagUrlBase: '#search/%23',
      usernameUrlBase: '#profile/',
    });
  }
}
