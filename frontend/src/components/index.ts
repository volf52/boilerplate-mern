import { RouteProps } from 'react-router-dom';

export interface PrivateRouteProps extends RouteProps {
    component: any;
    auth: any;
}
