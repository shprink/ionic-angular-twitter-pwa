import { authReducer, IAuthState } from './auth';
import { usersReducer, IUsersState } from './users';
import { feedReducer, IFeed } from './feed';
import { trendsReducer, ITrends } from './trends';
import { notificationsReducer, INotification } from './notifications';

export * from './auth';
export * from './users';
export * from './feed';
export * from './trends';
export * from './notifications';

export interface AppState {
    auth: IAuthState;
    users: IUsersState;
    feed: IFeed;
    trends: ITrends;
    notifications: INotification[];
}

export const Reducers = {
    auth: authReducer,
    users: usersReducer,
    feed: feedReducer,
    trends: trendsReducer,
    notifications: notificationsReducer,
}