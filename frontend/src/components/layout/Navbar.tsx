import {
    AppBar,
    Button,
    IconButton,
    Toolbar,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as t from 'io-ts';
import { props } from 'prop-types-ts';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { authObject, rootState } from '../../reducers';
// import MenuIcon from '@material-ui/icons/Menu';

const NavbarPropTypes = t.interface(
    {
        logoutUser: t.Function,
        auth: authObject,
    },
    'NavbarProps'
);

type NavbarProps = t.TypeOf<typeof NavbarPropTypes>;

@props(NavbarPropTypes)
class Navbar extends Component<NavbarProps, { classes: any }> {
    constructor(props: NavbarProps) {
        super(props);
        this.state = {
            classes: this.useStyles(),
        };
    }

    onLogoutClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        this.props.logoutUser();
    };

    useStyles = () => {
        return makeStyles(theme => ({
            root: {
                flexGrow: 1,
            },
            menuButton: {
                marginRight: theme.spacing(2),
            },
            title: {
                flexGrow: 1,
            },
        }));
    };

    render() {
        const { isAuthenticated } = this.props.auth;

        // const guestLinks = (
        //     <ul id='nav-mobile' className='right hide-on-med-and-down'>
        //         <li>
        //             <Link to='/login' className='black-text'>
        //                 Login
        //             </Link>
        //         </li>
        //         <li>
        //             <Link className='black-text' to='/register'>
        //                 Register
        //             </Link>
        //         </li>
        //     </ul>
        // );

        // const authLinks = (
        //     <ul id='nav-mobile' className='right hide-on-med-and-down'>
        //         <li>
        //             <Link
        //                 className='black-text'
        //                 onClick={this.onLogoutClick}
        //                 to='/'>
        //                 Logout
        //             </Link>
        //         </li>
        //     </ul>
        // );
        const { classes } = this.state;
        return (
            // <div className='navbar-fixed'>
            //     <nav className='z-depth-0'>
            //         <div className='nav-wrapper white'>
            //             <Link
            //                 to='/'
            //                 style={{
            //                     fontFamily: 'monospace',
            //                 }}
            //                 className='brand-logo center black-text'>
            //                 <i className='material-icons'>code</i>
            //                 Ship Routing and Management
            //             </Link>
            //             {isAuthenticated ? authLinks : guestLinks}
            //         </div>
            //     </nav>
            // </div>
            <div className={classes.root}>
                <AppBar position='static' title='Ship Routing and Management'>
                    <Toolbar>
                        <Typography variant='h5' color='inherit'>
                            React and Material-UI Sample Application
                        </Typography>
                        <IconButton
                            edge='start'
                            className={classes.menuButton}
                            color='inherit'
                            aria-label='Menu'>
                            {/* <MenuIcon /> */}
                        </IconButton>
                        <Typography variant='h6' className={classes.title}>
                            News
                        </Typography>
                        <Button color='inherit' href='/login'>
                            Login
                        </Button>
                    </Toolbar>
                </AppBar>
                {/* <List component="nav" ></List> */}
            </div>
        );
    }
}

const mapStatesToProps = (state: rootState) => ({
    auth: state.auth,
});

export default connect(
    mapStatesToProps,
    { logoutUser }
)(Navbar);
