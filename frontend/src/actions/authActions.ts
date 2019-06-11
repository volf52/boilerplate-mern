import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
    ActionTypes,
    errorAction,
    loginAction,
    LoginData,
    registerAction,
    RegisterData,
    UserPayload,
} from '.';
import { authState } from '../reducers';
import setAuthToken from '../utils/setAuthToken';

export const registerUser = (
    userData: RegisterData,
    history: Array<string>
) => (dispatch: Dispatch<registerAction>) => {
    axios
        .post('/api/users/register', userData)
        .then(() => history.push('/login'))
        .catch(err =>
            dispatch({
                type: ActionTypes.GET_ERRORS,
                payload: err.response.data,
            })
        );
};
export const loginUser = (userData: LoginData) => (
    dispatch: Dispatch<loginAction | errorAction>
) => {
    axios
        .post('/api/users/login', userData)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode<UserPayload>(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: ActionTypes.GET_ERRORS,
                payload: err.response.data,
            } as errorAction)
        );
};

export const setCurrentUser = (decodedToken?: UserPayload): loginAction => {
    return {
        type: ActionTypes.SET_CURRENT_USER,
        payload: decodedToken,
    };
};

// any is a work around
export const logoutUser = (): ThunkAction<
    void,
    authState,
    null,
    loginAction
> => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser());
};
