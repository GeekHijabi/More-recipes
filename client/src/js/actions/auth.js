import axios from 'axios';
import jwt from 'jsonwebtoken';
import setToken from '../utils/setToken';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  SET_CURRENT_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
  REMOVE_CURRENT_USER } from '../constants';

export const loginSuccess = message => ({
  type: LOGIN_USER_SUCCESS,
  message
});

export const loginFailure = error => ({
  type: LOGIN_USER_FAILURE,
  error
});

export const signupSuccess = message => ({
  type: SIGNUP_USER_SUCCESS,
  message
});

export const signupFailure = error => ({
  type: SIGNUP_USER_FAILURE,
  error
});

export const removeCurrentUser = () => ({
  type: REMOVE_CURRENT_USER
});

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

/**
 * Async action for Register user
 * @returns {promise} request
 * @param {object} options
 */
export const apiRegisterUser = ({
  userName, email, password, firstName, lastName
}) =>
  function action(dispatch) {
    const request = axios({
      data: {
        userName, email, password, firstName, lastName
      },
      method: 'POST',
      url: '/api/v1/user/signup'
    });
    request.then((res) => {
      if (res && res.response) {
        dispatch(signupSuccess(res.response.data.message));
      }
    }).catch((err) => {
      if (err && err.response) {
        dispatch(signupFailure(err.response.data.error));
      }
    });
    return request;
  };

/**
 * Async action for Login
 * @returns {promise} request
 * @param {object} options
 */
export const apiLoginUser = ({
  identifier, userName, email, password
}) =>
  function action(dispatch) {
    const request = axios({
      data: {
        identifier: identifier || userName || email,
        password
      },
      method: 'POST',
      url: '/api/v1/user/signin'
    });
    request.then((response) => {
      const { token } = response.data;
      const decodedToken = jwt.decode(token);
      setToken(token);
      dispatch(loginSuccess(response.data.message));
      dispatch(setCurrentUser(decodedToken));
    }).catch((err) => {
      if (err && err.data) {
        dispatch(loginFailure(err.data.error));
      }
    });
    return request;
  };
