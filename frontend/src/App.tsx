import Dashboard from 'components/app/Dashboard';
import Login from 'components/auth/Login';
import Register from 'components/auth/Register';
import Landing from 'components/layout/Landing';
import Navbar from 'components/layout/Navbar';
import PrivateRoute from 'components/PrivateRoute';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from 'store';
import { ToastContainer } from 'react-toastify';

// if (localStorage.jwtToken) {
//     const token = localStorage.jwtToken as string;
//     setAuthToken(token);
//     const decoded = jwt_decode<UserPayload>(token);
//     store.dispatch(setCurrentUser(decoded));

//     const currentTime = Date.now() / 1000; // ms
//     if (decoded.expiresIn < currentTime) {
//         store.dispatch<any>(logoutUser());
//         window.location.href = './login';
//     }
// }

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div className='App'>
                        <ToastContainer />
                        <Navbar />
                        <Route exact path='/' component={Landing} />
                        <Route exact path='/register' component={Register} />
                        <Route exact path='/login' component={Login} />
                        <Switch>
                            <PrivateRoute
                                exact
                                path='/dashboard'
                                component={Dashboard}
                            />
                            />
                        </Switch>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
