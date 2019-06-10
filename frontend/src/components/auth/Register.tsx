import classnames from 'classnames';
import * as t from 'io-ts';
import { props } from 'prop-types-ts';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, RouteProps } from 'react-router-dom';
import { RegisterComponentState } from '..';
import { registerUser } from '../../actions/authActions';
import { authObject, authState, errorState, rootState } from '../../reducers';

const RegisterPropTypes = t.interface(
    {
        registerUser: t.Function,
        auth: authObject,
        errors: t.object,
        history: t.array(t.string),
    },
    'RegisterProps'
);

interface StateProps {
    auth: authState;
    errors: errorState;
}
interface OwnProps {
    history: Array<string>;
}
interface DispachProps {
    registerUser: typeof registerUser;
}

type RegisterProps = t.TypeOf<typeof RegisterPropTypes>;

@props(RegisterPropTypes)
class Register extends Component<
    RegisterProps & RouteProps,
    RegisterComponentState
> {
    constructor(props: RegisterProps) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps: RegisterProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors,
            });
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ [e.target.id]: e.target.value, ...this.state });
    };

    onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { name, email, password, password2 } = this.state;
        const newUser = {
            name,
            email,
            password,
            password2,
        };

        this.props.registerUser(newUser, this.props.history);
    };

    render() {
        const { errors } = this.state;
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col s8 offset-s2'>
                        <Link to='/' className='btn-flat waves-effect'>
                            <i className='material-icons left'>
                                keyboard_backspace
                            </i>{' '}
                            Back to home
                        </Link>
                        <div
                            className='col s12'
                            style={{ paddingLeft: '11.250px' }}>
                            <h4>
                                <b>Register</b> below
                            </h4>
                            <p className='grey-text text-darken-1'>
                                Already have an account?{' '}
                                <Link to='/login'>Log in</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className='input-field col s12'>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    id='name'
                                    type='text'
                                    className={classnames('', {
                                        invalid: errors.name,
                                    })}
                                />
                                <label htmlFor='name'>Name</label>
                                <span className='red-text'>{errors.name}</span>
                            </div>
                            <div className='input-field col s12'>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    id='email'
                                    type='email'
                                    className={classnames('', {
                                        invalid: errors.email,
                                    })}
                                />
                                <label htmlFor='email'>Email</label>
                                <span className='red-text'>{errors.email}</span>
                            </div>
                            <div className='input-field col s12'>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    id='password'
                                    type='password'
                                    className={classnames('', {
                                        invalid: errors.password,
                                    })}
                                />
                                <label htmlFor='password'>Password</label>
                                <span className='red-text'>
                                    {errors.password}
                                </span>
                            </div>
                            <div className='input-field col s12'>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password2}
                                    id='password2'
                                    type='password'
                                    className={classnames('', {
                                        invalid: errors.password2,
                                    })}
                                />
                                <label htmlFor='password2'>
                                    Confirm Password
                                </label>
                                <span className='red-text'>
                                    {errors.password2}
                                </span>
                            </div>
                            <div
                                className='col s12'
                                style={{ paddingLeft: '11.250px' }}>
                                <button
                                    style={{
                                        width: '150px',
                                        borderRadius: '3px',
                                        letterSpacing: '1.5px',
                                        marginTop: '1rem',
                                    }}
                                    type='submit'
                                    className='btn btn-large waves-effect waves-light hoverable blue accent-3'>
                                    Sign up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: rootState): StateProps => ({
    auth: state.auth,
    errors: state.errors,
});

const mapDispatchToProps = (): DispachProps => ({
    registerUser,
});

// export default withRouter(connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Register) as React.ComponentType<any>);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Register as React.ComponentType<any>));
