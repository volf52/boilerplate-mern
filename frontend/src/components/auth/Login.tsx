import classnames from 'classnames';
import * as t from 'io-ts';
import { props } from 'prop-types-ts';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { LoginComponentState } from '..';
import { LoginData } from '../../actions';
import { loginUser } from '../../actions/authActions';
import { authObject, authState, errorState, rootState } from '../../reducers';

const LoginPropTypes = t.interface(
    {
        auth: authObject,
        errors: t.object,
        loginUser: t.Function,
        history: t.array(t.string),
    },
    'LoginProps'
);
interface StateProps {
    auth: authState;
    errors: errorState;
}
interface OwnProps {
    history: Array<string>;
}
interface DispachProps {
    loginUser: typeof loginUser;
}

// type LoginProps = StateProps & DispachProps & OwnProps;
type LoginProps = t.TypeOf<typeof LoginPropTypes>;

@props(LoginPropTypes)
class Login extends Component<LoginProps, LoginComponentState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps: LoginProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }

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

        const { email, password } = this.state;
        const userData = {
            email,
            password,
        } as LoginData;

        this.props.loginUser(userData);
    };

    render(): JSX.Element {
        const { errors } = this.state;
        return (
            <div className='container'>
                <div style={{ marginTop: '4rem' }} className='row'>
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
                                <b>Login</b> below
                            </h4>
                            <p className='grey-text text-darken-1'>
                                Don't have an account?{' '}
                                <Link to='/register'>Register</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className='input-field col s12'>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    id='email'
                                    type='email'
                                    className={classnames('', {
                                        invalid:
                                            errors.email ||
                                            errors.emailNotFound,
                                    })}
                                />
                                <label htmlFor='email'>Email</label>
                                <span className='red-text'>
                                    {errors.email}
                                    {errors.emailNotFound}
                                </span>
                            </div>
                            <div className='input-field col s12'>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    id='password'
                                    type='password'
                                    className={classnames('', {
                                        invalid:
                                            errors.password ||
                                            errors.passwordIncorrect,
                                    })}
                                />
                                <label htmlFor='password'>Password</label>
                                <span className='red-text'>
                                    {errors.password}
                                    {errors.passwordIncorrect}
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
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapSateToProps = (state: rootState): StateProps => ({
    auth: state.auth,
    errors: state.errors,
});

const mapDispatchToProps = (): DispachProps => ({
    loginUser,
});

export default connect(
    mapSateToProps,
    mapDispatchToProps
)(Login);
