import { ActionTypes } from 'Actions';
import { Reducer } from 'redux';
import { errorAction, errorState } from '.';

const initialState = <errorState>{};

const errorReducer: Reducer<errorState> = (state = initialState, action) => {
    switch ((action as errorAction).type) {
        case ActionTypes.GET_ERRORS:
            return action.payload;
        default:
            return state;
    }
};

export default errorReducer;
