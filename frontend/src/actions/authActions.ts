import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Dispatch } from 'redux';
import {
    ActionTypes,
    errorAction,
    loginAction,
    LoginData,
    registerAction,
    RegisterData,
} from '.';
import setAuthToken from '../utils/setAuthToken';

export const registerUser = (
    userData: RegisterData,
    history: Array<string>
) => (dispatch: Dispatch<registerAction>) => {
    axios
        .post('/api/users/register', userData)
        .then(res => history.push('/login'))
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
            const decoded = jwt_decode<string>(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: ActionTypes.GET_ERRORS,
                payload: err.response.data,
            })
        );
};

export const setCurrentUser = (decodedToken?: string): loginAction => {
    return {
        type: ActionTypes.SET_CURRENT_USER,
        payload: decodedToken,
    };
};

export const logoutUser = () => (dispatch: Dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser());
};
