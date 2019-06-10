import { ComponentClass } from 'react';
import { RouteProps } from 'react-router-dom';
import { authState, errorState } from '../reducers';
import { loginUser } from '../actions/authActions';

export interface PrivateRouteProps extends RouteProps {
    component: ComponentClass;
    auth: authState;
}

export interface LoginComponentState {
    email: string;
    password: string;
    errors: any;
}

export interface RegisterComponentState extends LoginComponentState {
    name: string;
    password2: string;
}
