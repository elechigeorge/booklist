import axios from 'axios';
import { returnErrors } from './messages';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS
} from './types';

// check token & load user
export const loadUser = () => (dispatch, getState) => {
    // User Loading
    dispatch({
        type: USER_LOADING
    });

    axios.get('/api/auth/user', tokenConfig(getState)).then(res => {
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    }).catch(error => {

        dispatch(returnErrors(error.response.data, error.response.status))
        dispatch({
            type: AUTH_ERROR
        })
    })
}


export const login = (username, password) => dispatch => {

    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }

    // Request 
    const body = JSON.stringify({ username, password })

    axios.post('/api/auth/login', body, config).then(res => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
    }).catch(error => {

        dispatch(returnErrors(error.response.data, error.response.status))
        dispatch({
            type: LOGIN_FAIL
        })
    })
}


// Register User
export const register = ({ username, password, email }) => dispatch => {

    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }

    // Request 
    const body = JSON.stringify({ username, password, email })

    axios.post('/api/auth/register', body, config).then(res => {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    }).catch(error => {

        dispatch(returnErrors(error.response.data, error.response.status))
        dispatch({
            type: REGISTER_FAIL
        })
    })
}


// Logout
export const logout = () => (dispatch, getState) => {
    // User Loading
    dispatch({
        type: USER_LOADING
    });

    // Make request
    axios.post('/api/auth/logout', null, tokenConfig(getState)).then(res => {
        dispatch({
            type: LOGOUT_SUCCESS,
        })
    }).catch(error => {
        dispatch(returnErrors(error.response.data, error.response.status))
    })
}



// setup helper func
export const tokenConfig = getState => {
    // Get token 
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }

    // Check token
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
}