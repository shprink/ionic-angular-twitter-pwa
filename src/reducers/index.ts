import { authReducer, IAuthState } from './auth';
import { usersReducer, IUsersState } from './users';
import { feedReducer, IFeed } from './feed';
import { trendsReducer, ITrends } from './trends';
import { mentionsReducer, IMentions } from './mentions';
import { tweetsReducer, ITweets } from './tweets';
import { searchReducer, ISearch } from './search';

export * from './auth';
export * from './users';
export * from './feed';
export * from './trends';
export * from './mentions';
export * from './tweets';
export * from './search';

export interface AppState {
    auth: IAuthState;
    users: IUsersState;
    feed: IFeed;
    trends: ITrends;
    mentions: IMentions;
    tweets: ITweets;
    search: ISearch;
}

export const Reducers = {
    auth: authReducer,
    users: usersReducer,
    feed: feedReducer,
    trends: trendsReducer,
    mentions: mentionsReducer,
    tweets: tweetsReducer,
    search: searchReducer,
}