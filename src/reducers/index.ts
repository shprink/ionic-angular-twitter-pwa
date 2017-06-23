import { authReducer, IAuthState } from './auth';
import { usersReducer, IUsersState } from './users';
import { feedReducer, IFeed } from './feed';
import { trendsReducer, ITrends } from './trends';
import { mentionsReducer, IMentions } from './mentions';
import { tweetsReducer, ITweets } from './tweets';

export * from './auth';
export * from './users';
export * from './feed';
export * from './trends';
export * from './mentions';
export * from './tweets';

export interface AppState {
    auth: IAuthState;
    users: IUsersState;
    feed: IFeed;
    trends: ITrends;
    mentions: IMentions;
    tweets: ITweets
}

export const Reducers = {
    auth: authReducer,
    users: usersReducer,
    feed: feedReducer,
    trends: trendsReducer,
    mentions: mentionsReducer,
    tweets: tweetsReducer,
}