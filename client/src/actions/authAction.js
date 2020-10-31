import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {LOGGED_USER, ERRORS} from '../constants/types';
import setAuthToken from '../auth/authToken';

export const signUp = (user, history) => dispatch => {
    axios.post('/api/user/register', user)
    .then((res) =>{
        console.log(res);
        history.push('/login');
    })
    .catch((err) =>{
        dispatch({
            type: ERRORS,
            payload: err.response.data
          })
    })
}

export const logIn = (user) => dispatch => {    
    axios.post('/api/user/login', user)
    .then((res) =>{
        const { token } = res.data;
        localStorage.setItem('token', token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(loggedUser(decoded));
    }).catch((err) =>{
        dispatch({
            type: ERRORS,
            payload: err.response.data
        })
    })
}

export const loggedUser = (user) => {
    return {
        type: LOGGED_USER,
        payload: user
    }
}

export const logOut = () => dispatch => {
    localStorage.removeItem('token');
    setAuthToken(false);
    dispatch(loggedUser({}));
}