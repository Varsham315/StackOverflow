import * as api from '../api';
import { setCurrentUser } from './currentUser';

export const signup = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(authData);
        dispatch({ type: 'AUTH', data });
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
        navigate('/');
    } catch (error) {
        alert(error.response.data.msg);
        console.log(error);
    }
};

export const login = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.logIn(authData);
        dispatch({ type: 'AUTH', data });
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
        navigate('/');
    } catch (error) {
        alert(error.response.data.msg);
        console.log(error);
    }
};

export const verifysignUp = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.verifySignUp(authData);
        dispatch({ type: 'AUTH', data });
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
        navigate('/');
    } catch (error) {
        alert(error.response.data.msg);
        console.log(error);
    }
};

export const verifylogin = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.verifyLogIn(authData);
        dispatch({ type: 'AUTH', data });
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
        navigate('/');
    } catch (error) {
        alert(error.response.data.msg);
        console.log(error);
    }
};
