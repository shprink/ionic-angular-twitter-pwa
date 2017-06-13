import { ActionReducer, Action } from '@ngrx/store';
import _pickBy from 'lodash/pickBy';

import { FEED_FETCH, FEED_FETCHED, FEED_ERROR, LOGOUT, INIT } from '../actions';
import { ITwitterUser } from './users';

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
      const newItems = filterFeedItems(payload.feed);
      return {
        fetching: false,
        list: payload.reset ? newItems : [...state.list, ...newItems],
      };
    }

    case INIT: {
      return (
        Object.assign({}, payload.feed, { fetching: false }) || defaultState
      );
    }

    case LOGOUT: {
      return defaultState;
    }

    default:
      return state;
  }
};

function filterFeedItems(feed = []) {
  const feedItems = [];
  feed.forEach(item => {
    let feedItem = _pickBy(item, (v, k) => propertiesToKeep.includes(k));
    feedItem.userHandle = feedItem.user.screen_name;
    delete feedItem.user;
    feedItems.push(feedItem);
  });
  return feedItems;
}

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
