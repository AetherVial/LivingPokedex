import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';
import jwt_decode from "jwt-decode";
// import './index.css';
// import App from './App';
// import axios from "axios";
// //import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// window.axios = axios;
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// //serviceWorker.unregister();


document.addEventListener('DOMContentLoaded', () => {
    let store;

    if (localStorage.jwtToken) {
        setAuthToken(localStorage.jwtToken);
        const decodedUser = jwt_decode(localStorage.jwtToken);

        const preloadedState = {
            session: {
                isAuthenticated: true, 
                user: decodedUser
            }
        };

        store = configureStore(preloadedState);

        const currentTime = Date.now() / 1000;

        if (decodedUser.exp < currentTime) {
            // console.log("logout");
            store.dispatch(logout());
            window.location.href = "/login";
        }
    } else {
        store = configureStore();
    }

    const root = document.getElementById('root');

    ReactDOM.render(<Root store={store} />, root);
});
