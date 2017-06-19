import _pickBy from 'lodash/pickBy';

export function filterFeedList(list = [], propertiesToKeep = []) {
    const feedItems = [];
    list.forEach(item => {
        let feedItem = _pickBy(item, (v, k) => propertiesToKeep.includes(k));
        feedItem.userHandle = feedItem.user.screen_name;
        delete feedItem.user;
        feedItems.push(feedItem);
    });
    return feedItems;
}