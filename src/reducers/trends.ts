import { ActionReducer, Action } from '@ngrx/store';

import { ADD_TRENDS, LOGOUT, INIT } from '../actions';

const defaultState = {
    hashtags: [],
    as_of: null,
    created_at: null,
    locations: null,
};

export const trendsReducer: ActionReducer<Object> = (state: ITrends = defaultState, action: Action) => {
    const payload = action.payload;

    switch (action.type) {
        case ADD_TRENDS: {
            const { trends: hashtags, ...rest } = payload;
            return {
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
    as_of: string | null;
    created_at: string | null;
    hashtags: ITrendingHashtag[];
    locations: any;
}
