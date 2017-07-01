import { ActionReducer, Action } from '@ngrx/store';
import _pickBy from 'lodash/pickBy';

import {
    MENTIONS_FETCHED, FEED_FETCHED, LOGOUT, INIT, SEARCH_FETCHED, 
    TWEET_RETWEET, TWEET_UNRETWEET, TWEET_FAVORITE, TWEET_UNFAVORITE,
    USER_TWEETS_FETCHED, USER_LIKES_FETCHED
} from '../actions';
import { ITwitterUser } from './users';

const defaultState = {};

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
    'retweeted_status',
    'entities',
];

export const tweetsReducer: ActionReducer<Object> = (state: ITweets = defaultState, action: Action, ) => {
    const payload = action.payload;

    switch (action.type) {
        case USER_TWEETS_FETCHED:
        case USER_LIKES_FETCHED:    
        case SEARCH_FETCHED:
        case MENTIONS_FETCHED:
        case FEED_FETCHED: {
            return { ...state, ...filterTweetList(payload.feed, propertiesToKeep) };
        }

        case TWEET_RETWEET: {
            return {
                ...state,
                [payload.id]: {
                    ...state[payload.id],
                    retweeted: true
                }
            };
        }

        case TWEET_UNRETWEET: {
            return {
                ...state,
                [payload.id]: {
                    ...state[payload.id],
                    retweeted: false
                }
            };
        }

        case TWEET_FAVORITE:
        case TWEET_UNFAVORITE: {
            return { ...state, ...filterTweetList([payload.tweet], propertiesToKeep) };
        }

        case INIT: {
            return payload.tweets || state;
        }

        case LOGOUT: {
            return defaultState;
        }

        default:
            return state;
    }
};

function filterTweetProperties(tweet) {
    let feedItem = _pickBy(tweet, (v, k) => propertiesToKeep.includes(k));
    feedItem.userHandle = feedItem.user.screen_name.toLowerCase();
    delete feedItem.user;
    return feedItem;
}

export function filterTweetList(list = [], propertiesToKeep = []) {
    const feedItems = {};
    list.forEach(item => {
        let feedItem = filterTweetProperties(item);
        if (feedItem.retweeted_status) { // if the tweet contains another tweet
            let retweetedFeedItem = filterTweetProperties(feedItem.retweeted_status);
            feedItems[retweetedFeedItem.id_str] = retweetedFeedItem;
            feedItem.retweeted_status_id = retweetedFeedItem.id_str;
            delete feedItem.retweeted_status;
        }
        feedItems[feedItem.id_str] = feedItem;
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
    userHandle?: string;
    user?: ITwitterUser;
    retweeted_status_id?: string;
    retweeted_status?: ITweet;
    entities: ITweetEntities;
}

export interface ITweets {
    [key: string]: ITweet
}