import { Action } from '@ngrx/store';

export const FEED_FETCH = 'FEED_FETCH';
export const FEED_FETCHED = 'FEED_FETCHED';
export const FEED_ERROR = 'FEED_ERROR';

export const fetchFeed = (): Action => ({
  type: FEED_FETCH,
});

export const fetchedFeed = (feed, reset = false): Action => ({
  type: FEED_FETCHED,
  payload: { feed, reset },
});

export const errorFeed = (): Action => ({
  type: FEED_ERROR,
});
