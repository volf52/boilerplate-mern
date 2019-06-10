import { combineReducers, ReducersMapObject } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import { supportedAction } from '../actions';
export interface errorState {}
export interface authState {
    isAuthenticated: boolean;
    user: {};
    loading: boolean;
}

export interface rootState {
    auth: authState;
    errors: errorState;
}

const reducers: ReducersMapObject<rootState, supportedAction> = {
    auth: authReducer,
    errors: errorReducer,
};
export default combineReducers<rootState, supportedAction>(reducers);
