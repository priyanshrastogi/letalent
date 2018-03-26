import axios from 'axios';
import { LOGIN_USER, LOGOUT_USER, AUTH_ERROR } from './types';

const ROOT_URL = 'http://localhost:8000';

export function loginUser(cred, callback) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/users/login`, cred)
        .then( (res) => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', res.data.user.username);
            localStorage.setItem('name', res.data.user.name);
            localStorage.setItem('userId', res.data.user._id);
            dispatch({ type: LOGIN_USER });
            callback();
        })
        .catch((error) => {
            
            if (error.response) {
                if(error.response.status === 401) {
                    dispatch({ type: AUTH_ERROR, payload: 'Invalid Username or Password' });
                }
                else if (error.response.status === 500) {
                    dispatch({ type: AUTH_ERROR, payload: 'Internal Server Error. Please Try after Some Time' });
                }
            }
            
            else if(error.request) {
                dispatch({ type: AUTH_ERROR, payload: 'No Internet Connection' });
            }

        });
    }
}

export function logOutUser(callback) {
    return function(dispatch) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('name');
        dispatch({ type: LOGOUT_USER });
        callback();
    }
}

export function signUpUser(cred, callback) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/users/signup`, cred)
        .then((res) => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.user._id);
            localStorage.setItem('username', res.data.user.username);
            localStorage.setItem('name', res.data.user.name);
            dispatch({ type: LOGIN_USER });
            callback();
        })
        .catch((error) => {
            
            if (error.response) {
                dispatch({ type: AUTH_ERROR, payload: 'Username already exists' });
            }

            else if (error.request) {
                dispatch({ type: AUTH_ERROR, payload: 'No Internet Connection' });
            }

        });
    }
}