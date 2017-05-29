import { ActionReducer, Action } from '@ngrx/store';
import { SET_AUTH_CREDENTIAL, SET_AUTH_USER, INIT, LOGOUT } from '../actions';

import * as firebase from 'firebase/app';

const defaultState = {
    user: null,
    credential: null
};

export const authReducer: ActionReducer<Object> = (state: IAuthState = defaultState, action: Action) => {
    const payload = action.payload;

    switch (action.type) {
        case SET_AUTH_USER: {
            return Object.assign({}, state, {
                user: payload.user
            });
        }

        case SET_AUTH_CREDENTIAL: {
            return Object.assign({}, state, {
                credential: payload.credential
            });
        }

        case INIT: {
            return payload.auth || defaultState;
        }

        case LOGOUT: {
            return defaultState;
        }

        default:
            return state;
    }
}

export interface IStsTokenManager {
    accessToken: string;
    apiKey: string;
    expirationTime: number;
    refreshToken: string;
}

export interface IUser {
    uid: string;
    apiKey: string;
    appName: string;
    authDomain: string;
    displayName: string;
    email: string | null;
    emailVerified: boolean;
    isAnonymous: boolean;
    phoneNumber: string | null;
    photoURL: string;
    redirectEventId: string | null;
    providerData: firebase.UserInfo[];
    stsTokenManager: IStsTokenManager;
}

export interface ICredential {
    access_token_key: string;
    access_token_secret: string;
}

export interface IAuthState {
    user: IUser,
    credential: ICredential
}