import { ActionReducer, Action } from '@ngrx/store';
import _get from 'lodash/get';

import { USER_LIKES_FETCH, USER_LIKES_FETCHED, USER_LIKES_ERROR, LOGOUT, INIT } from '../actions';

const defaultState = {};

export const userLikesReducer: ActionReducer<Object> = (state: IUserLikes = defaultState, action: Action, ) => {
    const payload = action.payload;

    switch (action.type) {
        case USER_LIKES_FETCH: {
            return {
                ...state,
                [payload.username]: {
                    ...state[payload.username],
                    fetching: true
                }
            }
        }

        case USER_LIKES_ERROR: {
            return {
                ...state,
                [payload.username]: {
                    ...state[payload.username],
                    fetching: false
                }
            }
        }

        case USER_LIKES_FETCHED: {
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
            return payload.userLikes || defaultState;
        }

        case LOGOUT: {
            return defaultState;
        }

        default:
            return state;
    }
};

export interface IUserLikesFeed {
    fetching: boolean;
    list: string[];
}

export interface IUserLikes {
    [key: string]: IUserLikesFeed
}
