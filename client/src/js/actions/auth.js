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
  UPDATE_PROFILE_FAILURE,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,

} from '../constants';

export const loginSuccess = message => ({
  type: LOGIN_USER_SUCCESS,
  message
});

export const loginFailure = error => ({
  type: LOGIN_USER_FAILURE,
  error
});

export const signupSuccess = user => ({
  type: SIGNUP_USER_SUCCESS,
  user
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
export const forgotPasswordSuccess = email => ({
  type: FORGOT_PASSWORD_SUCCESS,
  email
});
export const forgotPasswordFailure = error => ({
  type: FORGOT_PASSWORD_FAILURE,
  error
});
export const resetPasswordSuccess = newPasswordMessage => ({
  type: RESET_PASSWORD_SUCCESS,
  newPasswordMessage
});
export const resetPasswordFailure = error => ({
  type: RESET_PASSWORD_FAILURE,
  error
});

const baseUrl = '/api/v1';

/**
 * Async action for Register user
 * @returns {promise} request
 * @param {object} options
 */
export const apiRegisterUser = ({
  userName, email, password
}) =>
  function action(dispatch) {
    const request = axios({
      data: {
        userName, email, password
      },
      method: 'POST',
      url: `${baseUrl}/user/signup`
    });
    request.then((res) => {
      if (res) {
        dispatch(signupSuccess(res.data));
      }
    }).catch((error) => {
      dispatch(signupFailure(error.response.data));
    });
    return request;
  };

/**
 * Async action for Login
 * @param {object} options
 * @returns {promise} request
 */
export const apiLoginUser = ({
  identifier, password, email, userName
}) =>
  function action(dispatch) {
    const request = axios({
      data: {
        identifier: identifier || email || userName,
        password
      },
      method: 'POST',
      url: `${baseUrl}/user/signin`
    });
    request.then((response) => {
      const { token } = response.data;
      const decodedToken = jwt.decode(token);
      setToken(token);
      localStorage.setItem('userId', decodedToken.id);

      dispatch(loginSuccess(response.data.message));
      dispatch(setCurrentUser(decodedToken));
    }).catch((err) => {
      dispatch(loginFailure(err.response.data.error));
    });
    return request;
  };

  /**
 * Async action for profile
 * @param {object} userId
 * @returns {promise} request
 */
export const apiGetCurrentUser = userId =>
  function action(dispatch) {
    const request = axios({
      method: 'GET',
      url: `${baseUrl}/user/${userId}`
    });
    request.then((response) => {
      dispatch(setCurrentUser(response.data));
    })
      .catch((error) => {
        dispatch(updateProfileFailure(error.data.error));
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
 * Async action for update profile
 * @param {object} options
 * @returns {promise} request
 */
export const apiUpdateUserProfile = ({
  userName, bio, summary, imageUrl
}) =>
  function action(dispatch) {
    const request = axios({
      data: {
        userName,
        bio,
        summary,
        imageUrl
      },
      method: 'PATCH',
      url: `${baseUrl}/user/:userId`
    });
    request.then((response) => {
      dispatch(updateProfileSuccess(response.data));
    }).catch((err) => {
      dispatch(updateProfileFailure(err.data.error));
    });
    return request;
  };

/**
 * Async action for forgot password
 * @param {object} userId
 * @returns {promise} request
 */
export const apiForgotPassword = userId =>
  function action(dispatch) {
    const request = axios({
      method: 'POST',
      url: `${baseUrl}/forgot-password/${userId}`,
    });
    request.then((response) => {
      dispatch(forgotPasswordSuccess(response.data.message));
    }).catch((err) => {
      dispatch(forgotPasswordFailure(err));
    });
    return request;
  };

/**
 * Async action for reset password
 * @param {object} userId
 * @returns {promise} request
 */
export const apiResetPassword = (userId, newPassword) =>
  function action(dispatch) {
    const request = axios({
      method: 'POST',
      url: `${baseUrl}/reset-password/2?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTE4MzQwMzMzLCJleHAiOjE1MTg0MjY3MzN9.-v2uiB54ZXRLFZYKL9tnSYoJ5aEQYQoV4Ie2cH71KM4`,
      data: {
        newPassword
      }
    });
    return request.then((response) => {
      console.log(response.data, 'response');
      return dispatch(resetPasswordSuccess(response.data.message));
    }).catch((err) => {
      console.log('err', err);
      dispatch(resetPasswordFailure(err));
    });
    // return request;
  };
