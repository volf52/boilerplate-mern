import PropTypes, { Validator } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { PrivateRouteProps } from '.';
import { authState, rootState } from '../reducers';

const PrivateRoute: React.FC<PrivateRouteProps> = props => {
    const { component: Component, auth, ...rest } = props;
    return (
        <Route
            {...rest}
            render={props =>
                auth.isAuthenticated === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect to='/login' />
                )
            }
        />
    );
};

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired as Validator<authState>,
};

const mapStateToProps = (state: rootState) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
