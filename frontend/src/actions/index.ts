import { Action } from 'redux';

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface registerAction extends Action<string> {
    type: ActionTypes.GET_ERRORS;
    payload: {};
}

export type UserPayload = {
    id: string;
    name: string;
    expiresIn: number;
};

export interface loginAction extends Action<string> {
    type: ActionTypes.SET_CURRENT_USER;
    payload: UserPayload | undefined;
}
export interface errorAction extends Action<string> {
    type: ActionTypes.GET_ERRORS;
    payload: {};
}

export type authAction = loginAction | registerAction;

export type supportedAction = authAction | errorAction;

export enum ActionTypes {
    GET_ERRORS = 'GET_ERRORS',
    USER_LOADING = 'USER_LOADING',
    SET_CURRENT_USER = 'SET_CURRENT_USER',
}
