import { Reducer } from 'redux';
import { errorState } from '.';
import { ActionTypes, errorAction } from '../actions';

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
