import { ActionReducer, Action } from '@ngrx/store';
import _get from 'lodash/get';

import { USER_TWEETS_FETCH, USER_TWEETS_FETCHED, USER_TWEETS_ERROR, LOGOUT, INIT } from '../actions';

const defaultState = {};

export const userTweetsReducer: ActionReducer<Object> = (state: IUserTweets = defaultState, action: Action, ) => {
    const payload = action.payload;

    switch (action.type) {
        case USER_TWEETS_FETCH: {
            return {
                ...state,
                [payload.username]: {
                    ...state[payload.username],
                    fetching: true
                }
            }
        }

        case USER_TWEETS_ERROR: {
            return {
                ...state,
                [payload.username]: {
                    ...state[payload.username],
                    fetching: false
                }
            }
        }

        case USER_TWEETS_FETCHED: {
            const newItems = payload.feed.map(item => item.id_str);
            const list = payload.reset || !state[payload.username]
                ? newItems
                : [...state[payload.username].list, ...newItems];
            return {
                ...state,
                [payload.username]: {
                    fetching: false,
                    list
                }
            };
        }

        case INIT: {
            return payload.userTweets || defaultState;
        }

        case LOGOUT: {
            return defaultState;
        }

        default:
            return state;
    }
};

export interface IUserTweetsFeed {
    fetching: boolean;
    list: string[];
}

export interface IUserTweets {
    [key: string]: IUserTweetsFeed
}
