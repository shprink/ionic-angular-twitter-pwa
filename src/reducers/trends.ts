import { ActionReducer, Action } from '@ngrx/store';

import { TRENDS_FETCHED, TRENDS_ERROR, TRENDS_FETCH, LOGOUT, INIT } from '../actions';

const defaultState = {
    fetching: false,
    hashtags: [],
    as_of: null,
    created_at: null,
    locations: null,
};

export const trendsReducer: ActionReducer<Object> = (state: ITrends = defaultState, action: Action) => {
    const payload = action.payload;

    switch (action.type) {
        case TRENDS_FETCH: {
            return Object.assign({}, state, { fetching: true });
        }

        case TRENDS_ERROR: {
            return Object.assign({}, state, { fetching: false });
        }

        case TRENDS_FETCHED: {
            const { trends: hashtags, ...rest } = payload;
            return {
                fetching: false,
                hashtags,
                ...rest,
            }
        }

        case INIT: {
            return payload.trends || defaultState;
        }

        case LOGOUT: {
            return defaultState;
        }

        default:
            return state;
    }
}

export interface ITrendingHashtag {
    name: number;
    url: string;
    promoted_content: string;
    query: string;
    tweet_volume: any;
}

export interface ITrends {
    fetching: boolean,
    as_of: string | null;
    created_at: string | null;
    hashtags: ITrendingHashtag[];
    locations: any;
}
