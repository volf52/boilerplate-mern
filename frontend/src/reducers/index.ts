import * as t from 'io-ts';
import { combineReducers, ReducersMapObject } from 'redux';
import { supportedAction } from '../actions';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export const authObject = t.type({
    isAuthenticated: t.boolean,
    user: t.union([
        t.type({
            id: t.string,
            name: t.string,
        }),
        t.undefined,
    ]),
    loading: t.boolean,
});
export type authState = t.TypeOf<typeof authObject>;
export interface errorState {}

export interface rootState {
    auth: authState;
    errors: errorState;
}

const reducers: ReducersMapObject<rootState, supportedAction> = {
    auth: authReducer,
    errors: errorReducer,
};
export default combineReducers<rootState, supportedAction>(reducers);
