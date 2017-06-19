import { authReducer, IAuthState } from './auth';
import { usersReducer, IUsersState } from './users';
import { feedReducer, IFeed } from './feed';
import { trendsReducer, ITrends } from './trends';
import { mentionsReducer, IMentions } from './mentions';

export * from './auth';
export * from './users';
export * from './feed';
export * from './trends';
export * from './mentions';

export interface AppState {
    auth: IAuthState;
    users: IUsersState;
    feed: IFeed;
    trends: ITrends;
    mentions: IMentions;
}

export const Reducers = {
    auth: authReducer,
    users: usersReducer,
    feed: feedReducer,
    trends: trendsReducer,
    mentions: mentionsReducer,
}