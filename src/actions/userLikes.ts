import { Action } from '@ngrx/store';

export const USER_LIKES_FETCH = 'USER_LIKES_FETCH';
export const USER_LIKES_FETCHED = 'USER_LIKES_FETCHED';
export const USER_LIKES_ERROR = 'USER_LIKES_ERROR';

export const fetchUserLikes = (username): Action => ({
  type: USER_LIKES_FETCH,
  payload: { username },
});

export const fetchedUserLikes = (username, feed, reset = false): Action => ({
  type: USER_LIKES_FETCHED,
  payload: { username, feed, reset },
});

export const errorUserLikes = (username): Action => ({
  type: USER_LIKES_ERROR,
  payload: { username },
});
