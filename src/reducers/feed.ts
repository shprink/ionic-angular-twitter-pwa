import { ActionReducer, Action } from '@ngrx/store';
import { ADD_FEED, RESET_FEED } from '../actions';
import _pickBy from 'lodash/pickBy';

const defaultState = [];

const propertiesToKeep: string[] = [
    'id', 'id_str', 'created_at', 'text', 'truncated', 'user'
];

export const feedReducer: ActionReducer<Object> = (state: IFeedItem[] = defaultState, action: Action) => {
    const payload = action.payload;

    switch (action.type) {
        case ADD_FEED: {
            return [...state, ...filterFeedItems(payload.feed)];
        }

        case RESET_FEED: {
            return filterFeedItems(payload.feed);
        }

        default:
            return state;
    }
}

function filterFeedItems(feed = []) {
    console.log('feed', feed)
    const feedItems = [];
    feed.forEach(item => {
        let feedItem = _pickBy(item, (v, k) => propertiesToKeep.includes(k))
        feedItem.userId = feedItem.user.id;
        delete feedItem.user;
        feedItems.push(feedItem);
    });
    return feedItems;
}

export interface IFeedItem {
    id: number;
    id_str: string;
    created_at: string;
    text: string;
    truncated: boolean;
    userId: number;
}
