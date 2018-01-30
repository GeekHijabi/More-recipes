import { cloneDeep } from 'lodash';
import initialState from '../utils/initialState';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
  SET_CURRENT_USER,
  REMOVE_CURRENT_USER,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  LOGOUT_USER_SUCCESS } from '../constants';

export default (state = initialState, action) => {
  const newState = cloneDeep(state);
  const {
    type, user, updatedUser, message, error
  } = action;

  switch (type) {
    case SIGNUP_USER_SUCCESS:
      return {
        ...newState,
        successMessage: message
      };
    case SIGNUP_USER_FAILURE:
      return {
        ...newState,
        errorMessage: error
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...newState,
        isAuthenticated: true,
        successMessage: message
      };
    case LOGIN_USER_FAILURE:
      return {
        ...newState,
        isAuthenticated: false,
        errorMessage: error
      };
    case SET_CURRENT_USER:
      return {
        ...newState,
        currentUser: user
      };
    case REMOVE_CURRENT_USER:
      return {
        ...newState,
        currentUser: {}
      };
    case LOGOUT_USER_SUCCESS:
      return {
        ...newState
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...newState,
        currentUser: updatedUser.updatedProfile,
        successMessage: updatedUser.status
      };
    case UPDATE_PROFILE_FAILURE:
      return {
        ...newState,
        errorMessage: error
      };
    default:
      return newState;
  }
};
