import { authReducer, IAuthState } from './auth';
import { usersReducer, IUsersState } from './users';
import { feedReducer, ITweet } from './feed';
import { trendsReducer, ITrends } from './trends';

export * from './auth';
export * from './users';
export * from './feed';
export * from './trends';

export interface AppState {
    auth: IAuthState;
    users: IUsersState;
    feed: ITweet[];
    trends: ITrends;
}

export const Reducers = {
    auth: authReducer,
    users: usersReducer,
    feed: feedReducer,
    trends: trendsReducer,
}