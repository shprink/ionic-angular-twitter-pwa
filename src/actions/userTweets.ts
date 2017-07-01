import { Action } from '@ngrx/store';

export const USER_TWEETS_FETCH = 'USER_TWEETS_FETCH';
export const USER_TWEETS_FETCHED = 'USER_TWEETS_FETCHED';
export const USER_TWEETS_ERROR = 'USER_TWEETS_ERROR';

export const fetchUserTweets = (username): Action => ({
  type: USER_TWEETS_FETCH,
  payload: { username },
});

export const fetchedUserTweets = (username, feed, reset = false): Action => ({
  type: USER_TWEETS_FETCHED,
  payload: { username, feed, reset },
});

export const errorUserTweets = (username): Action => ({
  type: USER_TWEETS_ERROR,
  payload: { username },
});
