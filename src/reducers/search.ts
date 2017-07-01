import { ActionReducer, Action } from '@ngrx/store';

import { SEARCH_FETCH, SEARCH_FETCHED, SEARCH_ERROR, LOGOUT } from '../actions';

const defaultState = {};

export const searchReducer: ActionReducer<Object> = (state: ISearch = defaultState, action: Action, ) => {
    const payload = action.payload;

    switch (action.type) {
        case SEARCH_FETCH: {
            return {
                ...state,
                [payload.term]: {
                    ...state[payload.term],
                    fetching: true
                }
            }
        }

        case SEARCH_ERROR: {
            return {
                ...state,
                [payload.term]: {
                    ...state[payload.term],
                    fetching: false
                }
            }
        }

        case SEARCH_FETCHED: {
            const newItems = payload.feed.map(item => item.id_str);
            const list = payload.reset || !state[payload.term]
                ? newItems
                : [...state[payload.term].list, ...newItems];
            return {
                ...state,
                [payload.term]: {
                    fetching: false,
                    list
              }
            };
        }

        case LOGOUT: {
            return defaultState;
        }

        default:
            return state;
    }
};

export interface ISearchItem {
    fetching: boolean;
    list: string[];
}

export interface ISearch {
    [key: string]: ISearchItem
}