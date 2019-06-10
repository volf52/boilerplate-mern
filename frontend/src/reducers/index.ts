import { ActionTypes } from 'Actions';
import { Action, combineReducers, ReducersMapObject } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
export interface errorState {}
export interface authState {
    isAuthenticated: boolean;
    user: {};
    loading: boolean;
}

export interface errorAction extends Action<string> {
    type: ActionTypes.GET_ERRORS;
    payload: {};
}

export interface authAction extends Action<string> {
    type: ActionTypes.SET_CURRENT_USER;
    payload: {};
}

export interface rootState {
    auth: authState;
    errors: errorState;
}

export type supportedAction = authAction | errorAction;

const reducers: ReducersMapObject<rootState, supportedAction> = {
    auth: authReducer,
    errors: errorReducer,
};
export default combineReducers<rootState, supportedAction>(reducers);
