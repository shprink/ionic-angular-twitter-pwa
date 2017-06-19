import { ActionReducer, Action } from '@ngrx/store';

import { MENTIONS_FETCH, MENTIONS_FETCHED, MENTIONS_ERROR, LOGOUT, INIT } from '../actions';
import { filterFeedList } from '../utils/feed';
import { ITweet } from './feed';

const defaultState = {
    fetching: false,
    list: [],
};

const propertiesToKeep: string[] = [
    'id',
    'id_str',
    'created_at',
    'text',
    'truncated',
    'user',
    'favorite_count',
    'favorited',
    'retweet_count',
    'retweeted',
    'entities',
];

export const mentionsReducer: ActionReducer<Object> = (state: IMentions = defaultState, action: Action) => {
    const payload = action.payload;

    switch (action.type) {
        case MENTIONS_FETCH: {
            return Object.assign({}, state, { fetching: true });
        }

        case MENTIONS_ERROR: {
            return Object.assign({}, state, { fetching: false });
        }

        case MENTIONS_FETCHED: {
            const newItems = filterFeedList(payload.feed, propertiesToKeep);
            return {
                fetching: false,
                list: payload.reset ? newItems : [...state.list, ...newItems],
            };
        }

        case INIT: {
            return payload.notifications || defaultState;
        }

        case LOGOUT: {
            return defaultState;
        }

        default:
            return state;
    }
}

export interface IMentions {
    fetching: boolean;
    list: ITweet[];
}
