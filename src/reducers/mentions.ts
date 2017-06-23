import { ActionReducer, Action } from '@ngrx/store';

import { MENTIONS_FETCH, MENTIONS_FETCHED, MENTIONS_ERROR, LOGOUT, INIT } from '../actions';

const defaultState = {
    fetching: false,
    list: [],
};

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
            const newItems = payload.feed.map(item => item.id_str);
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

        default:
            return state;
    }
}

export interface IMentions {
    fetching: boolean;
    list: string[];
}
