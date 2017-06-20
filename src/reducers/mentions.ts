import { ActionReducer, Action } from '@ngrx/store';
import _slice from 'lodash/slice';

import { ON_BEFORE_UNLOAD, MENTIONS_FETCH, MENTIONS_FETCHED, MENTIONS_ERROR, LOGOUT, INIT } from '../actions';
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
            if (!payload.mentions) return state;
            return {
                ...payload.mentions,
                fetching: false
            };
        }

        case LOGOUT: {
            return defaultState;
        }

        case ON_BEFORE_UNLOAD: {
            return {
                fetching: false,
                list: _slice(state.list, 0, 20),
            };
        }

        default:
            return state;
    }
}

export interface IMentions {
    fetching: boolean;
    list: ITweet[];
}
