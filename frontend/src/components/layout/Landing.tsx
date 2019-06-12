import { Button, Col, Layout, Row } from 'antd';
import * as t from 'io-ts';
import { props } from 'prop-types-ts';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authObject, rootState } from '../../reducers';

const LandingPropTypes = t.interface(
    {
        auth: authObject,
        history: t.array(t.string),
    },
    'LandingProps'
);

type LandingProps = t.TypeOf<typeof LandingPropTypes>;

@props(LandingPropTypes)
class Landing extends Component<LandingProps> {
    componentWillReceiveProps(nextProps: LandingProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    render() {
        return (
            <div>
                <Row type='flex' justify='center' align='middle'>
                    <Col span={6}>
                        <Row align='top'>
                            <Col span={12}>
                                <h1>
                                    <b>Welcome to Camorr</b>
                                </h1>
                            </Col>
                        </Row>

                        <Row align='bottom'>
                            <Col span={6}>
                                <Button type='primary' href='/login'>
                                    Login
                                </Button>
                            </Col>
                            <Col span={6}>
                                <Button type='primary' href='/register'>
                                    Register
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStatesToProps = (state: rootState) => ({
    auth: state.auth,
});

export default connect(mapStatesToProps)(Landing);
