import { ActionReducer, Action } from '@ngrx/store';

import { FEED_FETCH, FEED_FETCHED, FEED_ERROR, LOGOUT, INIT } from '../actions';

const defaultState = {
  fetching: false,
  list: [],
};

export const feedReducer: ActionReducer<Object> = (
  state: IFeed = defaultState,
  action: Action,
) => {
  const payload = action.payload;

  switch (action.type) {
    case FEED_FETCH: {
      return Object.assign({}, state, { fetching: true });
    }

    case FEED_ERROR: {
      return Object.assign({}, state, { fetching: false });
    }

    case FEED_FETCHED: {
      const newItems = payload.feed.map(item => item.id_str);
      return {
        fetching: false,
        list: payload.reset ? newItems : [...state.list, ...newItems],
      };
    }

    case INIT: {
      if (!payload.feed) return state;
      return {
        ...payload.feed,
        fetching: false
      };
    }

    case LOGOUT: {
      return defaultState;
    }

    default:
      return state;
  }
};

export interface IFeed {
  fetching: boolean;
  list: string[];
}
