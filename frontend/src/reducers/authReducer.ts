import { ActionTypes } from 'Actions';
import isEmpty from 'is-empty';

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
            };
        default:
            return state;
    }
}
