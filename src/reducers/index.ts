import { authReducer, IAuthState } from './auth';
import { usersReducer, IUsersState } from './users';
import { feedReducer, ITweet } from './feed';

export * from './auth';
export * from './users';
export * from './feed';

export interface AppState {
    auth: IAuthState;
    users: IUsersState;
    feed: ITweet[];
}

export const Reducers = {
    auth: authReducer,
    users: usersReducer,
    feed: feedReducer,
}