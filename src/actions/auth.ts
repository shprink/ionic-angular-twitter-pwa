import { Action } from '@ngrx/store';

export const ADD_AUTH_USER = 'ADD_AUTH_USER';
export const ADD_AUTH_CREDENTIAL = 'ADD_AUTH_CREDENTIAL';
export const CLEAN_AUTH = 'CLEAN_AUTH';
export const LOGIN = 'LOGIN';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';

export const addAuthUser = (user): Action => ({
    type: ADD_AUTH_USER,
    payload: { user }
});

export const addAuthCredential = (credential): Action => ({
    type: ADD_AUTH_CREDENTIAL,
    payload: { credential }
});

export const login = (user): Action => ({
    type: LOGIN,
    payload: { user }
});

export const cleanAuth = (): Action => ({
    type: CLEAN_AUTH
});

export const logout = (): Action => ({
    type: LOGOUT
});