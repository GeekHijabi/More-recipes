import axios from 'axios';
import jwt from 'jsonwebtoken';
import setToken from '../utils/setToken';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  SET_CURRENT_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
  LOGOUT_USER_SUCCESS,
  REMOVE_CURRENT_USER,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE } from '../constants';

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
export const logoutSuccess = () => ({
  type: LOGOUT_USER_SUCCESS
});

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});
export const updateProfileSuccess = updatedUser => ({
  type: UPDATE_PROFILE_SUCCESS,
  updatedUser
});
export const updateProfileFailure = error => ({
  type: UPDATE_PROFILE_FAILURE,
  error
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
      localStorage.setItem('userId', decodedToken.userDetail.id);
      dispatch(loginSuccess(response.data.message));
      dispatch(setCurrentUser(decodedToken));
    }).catch((err) => {
      if (err && err.data) {
        dispatch(loginFailure(err.data.error));
      }
    });
    return request;
  };

  /**
 * Async action for profile
 * @returns {promise} request
 * @param {object} options
 */
export const apiGetCurrentUser = () =>
  function action(dispatch) {
    const request = axios({
      method: 'GET',
      url: '/api/v1/user'
    });
    request.then((response) => {
      dispatch(setCurrentUser(response.data));
    }).catch((error) => {
      if (error && error.data) {
        dispatch(updateProfileFailure(error.data.error));
      }
    });
    return request;
  };

/**
 * @return {void}
 */
export const LogoutUser = () =>
  function action(dispatch) {
    localStorage.removeItem('token');
    dispatch(logoutSuccess());
    dispatch(removeCurrentUser());
  };

/**
 * Async action for profile
 * @returns {promise} request
 * @param {object} options
 */
export const apiUpdateUserProfile = ({
  firstName, lastName, bio, summary, imageUrl
}) =>
  function action(dispatch) {
    const request = axios({
      data: {
        firstName,
        lastName,
        bio,
        summary,
        imageUrl
      },
      method: 'PUT',
      url: '/api/v1/user/update-profile'
    });
    request.then((response) => {
      dispatch(updateProfileSuccess(response.data));
    }).catch((err) => {
      if (err && err.data) {
        dispatch(updateProfileFailure(err.data.error));
      }
    });
    return request;
  };
