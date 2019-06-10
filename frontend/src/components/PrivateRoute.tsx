import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { PrivateRouteProps } from '.';

const PrivateRoute = (props: PrivateRouteProps) => {
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
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
