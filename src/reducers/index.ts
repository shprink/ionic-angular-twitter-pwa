import { authReducer, IAuthState } from './auth';
import { usersReducer, IUsersState } from './users';
import { userTweetsReducer, IUserTweets } from './userTweets';
import { userLikesReducer, IUserLikes } from './userLikes';
import { feedReducer, IFeed } from './feed';
import { trendsReducer, ITrends } from './trends';
import { mentionsReducer, IMentions } from './mentions';
import { tweetsReducer, ITweets } from './tweets';
import { searchReducer, ISearch } from './search';

export * from './auth';
export * from './users';
export * from './userTweets';
export * from './userLikes';
export * from './feed';
export * from './trends';
export * from './mentions';
export * from './tweets';
export * from './search';

export interface AppState {
    auth: IAuthState;
    users: IUsersState;
    userTweets: IUserTweets;
    userLikes: IUserLikes;
    feed: IFeed;
    trends: ITrends;
    mentions: IMentions;
    tweets: ITweets;
    search: ISearch;
}

export const Reducers = {
    auth: authReducer,
    users: usersReducer,
    userTweets: userTweetsReducer,
    userLikes: userLikesReducer,
    feed: feedReducer,
    trends: trendsReducer,
    mentions: mentionsReducer,
    tweets: tweetsReducer,
    search: searchReducer,
}