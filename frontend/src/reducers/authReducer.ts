import { ActionTypes } from 'Actions';
import isEmpty from 'is-empty';
import { Reducer } from 'redux';
import { authAction, authState } from '.';

const initialState = <authState>{
    isAuthenticated: false,
    user: {},
    loading: false,
};
const authReducer: Reducer<authState> = (state = initialState, action) => {
    switch ((action as authAction).type) {
        case ActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;
