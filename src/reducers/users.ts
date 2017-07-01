import { ActionReducer, Action } from '@ngrx/store';
import {
    ADD_TWITTER_USER, ADD_CURRENT_TWITTER_USER, FEED_FETCHED,
    MENTIONS_FETCHED, INIT, SEARCH_FETCHED, USER_TWEETS_FETCHED,
    USER_LIKES_FETCHED
} from '../actions';
import _pickBy from 'lodash/pickBy';

const defaultState = {};

const propertiesToKeep: string[] = [
    'id', 'id_str', 'screen_name', 'name', 'description', 'url',
    'location', 'followers_count', 'friends_count',
    'profile_background_image_url_https', 'profile_banner_url',
    'profile_image_url_https', 'profile_use_background_image', 'following'
];

export const usersReducer: ActionReducer<Object> = (state: IUsersState = defaultState, action: Action) => {
    const payload = action.payload;

    switch (action.type) {
        case ADD_CURRENT_TWITTER_USER:
        case ADD_TWITTER_USER: {
            return Object.assign({}, state, {
                [payload.user.screen_name.toLowerCase()]: filterUser(payload.user)
            });
        }

        case USER_TWEETS_FETCHED:
        case USER_LIKES_FETCHED:    
        case SEARCH_FETCHED:
        case MENTIONS_FETCHED:
        case FEED_FETCHED: {
            if (!payload.feed) return state;
            const users = {};
            payload.feed.forEach(item => {
                users[item.user.screen_name.toLowerCase()] = filterUser(item.user);
                if (item.retweeted_status) {
                    users[item.retweeted_status.user.screen_name.toLowerCase()] = filterUser(item.retweeted_status.user);
                }
            });
            return Object.assign({}, state, users);
        }

        case INIT: {
            return payload.users || defaultState;
        }

        default:
            return state;
    }
}

function filterUser(user) {
    return _pickBy(user, (v, k) => propertiesToKeep.includes(k))
}

export interface ITwitterUser {
    id: number;
    id_str: string;
    name: string;
    screen_name: string;
    description: string;
    url: string;
    location: string;
    followers_count: number;
    friends_count: number;
    profile_background_color: string;
    profile_background_image_url_https: string;
    profile_banner_url: string;
    profile_image_url_https: string;
    profile_link_color: string;
    profile_text_color: string;
    profile_use_background_image: boolean;
}

export interface IUsersState {
    [key: number]: ITwitterUser
}