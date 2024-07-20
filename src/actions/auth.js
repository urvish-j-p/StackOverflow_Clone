import * as api from '../api'
import { setCurrentUser } from './currentUser'
import { fetchAllUsers } from './users';
import { message } from 'antd';

export const signup = (authData, navigate) => async (dispatch) => {
    try {
        const {data} = await api.signUp(authData)
        dispatch({type: "AUTH", data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        dispatch(fetchAllUsers());
        navigate('/')
    } catch (error) {
        if (error.response && error.response.status === 404) {
            message.error('User already exists. Please log in.');
        } else {
            console.log(error);
            message.error('Signup failed. Please try again.');
        }
    }
}

export const login = (authData, navigate) => async (dispatch) => {
    try {
        const {data} = await api.logIn(authData)
        dispatch({type: "AUTH", data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        navigate('/')
    } catch (error) {
        if (error.response && error.response.status === 404) {
            message.error('Email does not exist. Please sign up first.');
        } else {
            message.error('Login failed. Please try again.');
        }
    }
}

