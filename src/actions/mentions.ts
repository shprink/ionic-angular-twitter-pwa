import { Action } from '@ngrx/store';

export const MENTIONS_FETCH = 'MENTIONS_FETCH';
export const MENTIONS_FETCHED = 'MENTIONS_FETCHED';
export const MENTIONS_ERROR = 'MENTIONS_ERROR';

export const fetchMentions = (): Action => ({
    type: MENTIONS_FETCH,
});

export const fetchedMentions = (feed, reset = false): Action => ({
    type: MENTIONS_FETCHED,
    payload: { feed, reset }
});

export const errorMentions = (): Action => ({
    type: MENTIONS_ERROR,
});
