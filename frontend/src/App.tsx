import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';

import store from './store';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

if (localStorage.jwtToken) {
    const token = localStorage.jwtToken as string;
    setAuthToken(token);
    const decoded = jwt_decode(token);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000; // ms
    if (decoded.expiresIn < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = './login';
    }
}

class App extends Component {
    render() {
        return (
            <div className='App'>
                <h1>Boilerplate for MERN</h1>
            </div>
        );
    }
}

export default App;
