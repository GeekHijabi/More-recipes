import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOG_OUT,
  REMOVE_CURRENT_USER } from '../constants';


export const loginSucess = currentUser => ({
  type: LOGIN_USER_SUCCESS,
  currentUser
});

export const loginFailure = error => ({
  type: LOGIN_USER_FAILURE,
  error
});

export const logOut = () => ({
  type: LOG_OUT
});

export const removeCurrentUser = () => ({
  type: REMOVE_CURRENT_USER
});

