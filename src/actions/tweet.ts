import { Action } from '@ngrx/store';

export const TWEET_RETWEET = 'TWEET_RETWEET';
export const TWEET_UNRETWEET = 'TWEET_UNRETWEET';
export const TWEET_FAVORITE = 'TWEET_FAVORITE';
export const TWEET_UNFAVORITE = 'TWEET_UNFAVORITE';

export const tweetRetweet = (tweet, id): Action => ({
    type: TWEET_RETWEET,
    payload: { tweet, id }
});

export const tweetUnretweet = (tweet, id): Action => ({
    type: TWEET_UNRETWEET,
    payload: { tweet, id }
});

export const tweetFavorite = (tweet): Action => ({
    type: TWEET_FAVORITE,
    payload: { tweet }
});

export const tweetUnfavorite = (tweet): Action => ({
    type: TWEET_UNFAVORITE,
    payload: { tweet }
});
