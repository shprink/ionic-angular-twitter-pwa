import { ActionReducer, Action } from '@ngrx/store';
import _slice from 'lodash/slice';

import { ON_BEFORE_UNLOAD, FEED_FETCH, FEED_FETCHED, FEED_ERROR, LOGOUT, INIT } from '../actions';
import { ITwitterUser } from './users';
import { filterFeedList } from '../utils/feed';

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
      const newItems = filterFeedList(payload.feed, propertiesToKeep);
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

    case ON_BEFORE_UNLOAD: {
      return {
        fetching: false,
        list: _slice(state.list, 0, 20),
      };
    }

    default:
      return state;
  }
};

// https://dev.twitter.com/overview/api/entities-in-twitter-objects
export interface ITweetEntities {
  hashtags: ITweetEntitiesHashtag[];
  symbols: ITweetEntitiesSymbol[];
  url: ITweetEntitiesUrl[];
  media: ITweetEntitiesMedia[];
  user_mentions: ITweetEntitiesMention[];
}

export interface ITweetEntitiesHashtag {
  text: string;
  indices: number[];
}

export interface ITweetEntitiesSymbol {
  text: string;
  indices: number[];
}

export interface ITweetEntitiesUrl {
  display_url: string;
  expanded_url: string;
  url: string;
  indices: number[];
}

export interface ITweetEntitiesMedia {
  type: string;
  media_url_https: string;
}

export interface ITweetEntitiesMention {
  id: number;
  id_str: string;
  name: string;
  screen_name: string;
  indices: number[];
}

export interface ITweet {
  id: number;
  id_str: string;
  created_at: string;
  text: string;
  truncated: boolean;
  favorited: boolean;
  favorite_count: number;
  retweeted: boolean;
  retweet_count: number;
  userHandle?: number;
  user?: ITwitterUser;
  entities: ITweetEntities;
}

export interface IFeed {
  fetching: boolean;
  list: ITweet[];
}
