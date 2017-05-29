import { FormControl } from '@angular/forms';
import { getTweetLength } from 'twitter-text';

export function tweetValidator(c: FormControl) {
    return getTweetLength(c.value) > 140 ? {
        validateTweet: {
            valid: false
        }
    } : null;
}