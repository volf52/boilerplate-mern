/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Button, Layout, Menu } from 'antd';
import * as t from 'io-ts';
import { props } from 'prop-types-ts';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../../actions/authActions';
import { authObject, rootState } from '../../reducers';

const NavbarPropTypes = t.interface(
    {
        logoutUser: t.Function,
        auth: authObject,
    },
    'NavbarProps'
);
type NavbarProps = t.TypeOf<typeof NavbarPropTypes>;

const { Header } = Layout;

const rightMenu = css({
    lineHeight: '64px',
    float: 'right',
});

@props(NavbarPropTypes)
class NavbarMain extends Component<NavbarProps, { isOpen: boolean }> {
    constructor(props: NavbarProps) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    onLogoutClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { isAuthenticated } = this.props.auth;
        const guestLinks = (
            <Menu
                theme='dark'
                mode='horizontal'
                css={rightMenu}
                selectable={false}>
                <Menu.Item key='login'>
                    <NavLink to='/login' className='nav-text'>
                        Login
                    </NavLink>
                </Menu.Item>
                <Menu.Item key='register'>
                    <NavLink to='/register' className='nav-text'>
                        Register
                    </NavLink>
                </Menu.Item>
            </Menu>
        );

        const authLinks = (
            <Menu
                theme='dark'
                mode='horizontal'
                css={rightMenu}
                selectable={false}>
                <Menu.Item key='logout'>
                    <Button
                        type='link'
                        icon='logout'
                        onClick={this.onLogoutClick}>
                        Logout
                    </Button>
                </Menu.Item>
            </Menu>
        );
        return (
            <Header className='header'>
                {isAuthenticated ? authLinks : guestLinks}
            </Header>
        );
    }
}

const mapStatesToProps = (state: rootState) => ({
    auth: state.auth,
});

export default connect(
    mapStatesToProps,
    { logoutUser }
)(NavbarMain);
