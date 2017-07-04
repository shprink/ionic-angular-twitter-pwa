import { ActionReducer, Action } from '@ngrx/store';
import {
    ADD_AUTH_CREDENTIAL, ADD_AUTH_USER, INIT, CLEAN_AUTH, LOGOUT, LOGIN, ADD_CURRENT_TWITTER_USER
} from '../actions';
import _get from 'lodash/get';

import * as firebase from 'firebase/app';

const defaultState = {
    user: null,
    credential: null,
    provider: null,
    screen_name: null
};

export const authReducer: ActionReducer<Object> = (state: IAuthState = defaultState, action: Action) => {
    const payload = action.payload;

    switch (action.type) {
        case LOGIN: {
            const provider = _get(payload.user, 'providerData[0]');
            console.log('provider', provider)
            // delete payload.user.providerData;
            return Object.assign({}, state, {
                user: payload.user,
                provider
            });
        }

        case ADD_AUTH_USER: {
            const provider = _get(payload.user, 'providerData[0]');
            delete payload.user.providerData;
            return Object.assign({}, state, {
                user: payload.user,
                provider
            });
        }

        case ADD_AUTH_CREDENTIAL: {
            return Object.assign({}, state, {
                credential: mapCredential(payload.credential)
            });
        }

        case ADD_CURRENT_TWITTER_USER: {
            return Object.assign({}, state, {
                screen_name: payload.user.screen_name.toLowerCase()
            });
        }

        case INIT: {
            return payload.auth || defaultState;
        }

        // case LOGIN_FAILED:            
        case CLEAN_AUTH:
        case LOGOUT: {
            return defaultState;
        }

        default:
            return state;
    }
}

function mapCredential({ accessToken, secret }) {
    return {
        access_token_key: accessToken,
        access_token_secret: secret
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
    stsTokenManager: IStsTokenManager;
}

export interface ICredential {
    access_token_key: string;
    access_token_secret: string;
}

export interface ICover {
    h: number;
    w: number;
    url: string;
}

export interface ICovers {
    ipad: ICover;
    ipad_retina: ICover;
    web: ICover;
    web_retina: ICover;
    mobile: ICover;
    mobile_retina: ICover;
    "300x100": ICover;
    "600x200": ICover;
    "1500x500": ICover;
    "1080x360": ICover;
}

export interface IAuthState {
    user: IUser,
    credential: ICredential,
    provider: firebase.UserInfo,
    screen_name: string
}