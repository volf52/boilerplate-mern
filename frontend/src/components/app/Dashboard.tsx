import * as t from 'io-ts';
import { props } from 'prop-types-ts';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authObject, rootState } from '../../reducers';

const DashboardPropTypes = t.interface(
    {
        auth: authObject,
    },
    'DashboardProps'
);

type DashboardProps = t.TypeOf<typeof DashboardPropTypes>;

@props(DashboardPropTypes)
class Dashboard extends Component<DashboardProps> {
    render() {
        const { user } = this.props.auth;

        return (
            <div
                style={{ height: '75vh' }}
                className='container valign-wrapper'>
                <div className='row'>
                    <div className='col s12 center-align'>
                        <h4>
                            <b>Hey there</b>
                            {user ? `, ${user.name.split(' ')[0]}` : ''}
                            <p className='flow-text grey-text text-darken-1'>
                                You are logged into the{' '}
                                <span style={{ fontFamily: 'monospace' }}>
                                    MATRIX
                                </span>{' '}
                                👏
                            </p>
                        </h4>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: rootState) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
