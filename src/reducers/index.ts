import { authReducer, IAuthState } from './auth';
import { usersReducer, IUsersState } from './users';

export * from './auth';
export * from './users';

export interface AppState {
    auth: IAuthState;
    users: IUsersState;
}

export const Reducers = {
    auth: authReducer,
    users: usersReducer,
}