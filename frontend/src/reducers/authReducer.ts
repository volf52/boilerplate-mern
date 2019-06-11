import isEmpty from 'is-empty';
import { Reducer } from 'redux';
import { authState } from '.';
import { ActionTypes, authAction } from '../actions';

const initialState: authState = {
    isAuthenticated: false,
    user: undefined,
    loading: false,
};
const authReducer: Reducer<authState, authAction> = (
    state = initialState,
    action
): authState => {
    switch (action.type) {
        case ActionTypes.SET_CURRENT_USER:
            return {
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
                ...state,
            };
        default:
            return state;
    }
};

export default authReducer;
