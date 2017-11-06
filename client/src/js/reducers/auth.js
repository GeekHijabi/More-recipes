import { cloneDeep, isEmpty } from 'lodash';
import initialState from '../utils/initialState';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOG_OUT,
  REMOVE_CURRENT_USER } from '../constants';

export default (state = initialState.auth, action) => {
  const newState = cloneDeep(state);
  const { type, currentUser, error } = action;
  switch (type) {
    case LOGIN_USER_SUCCESS:
      return {
        ...newState,
        isAuthenticated: !isEmpty(currentUser),
        currentUser
      };
    case LOGIN_USER_FAILURE:
      return {
        ...newState,
        isAuthenticated: false,
        errorMessage: error
      };
    case LOG_OUT:
      return {
        ...newState,
        isAuthenticated: false
      };
    case REMOVE_CURRENT_USER:
      return {
        ...newState,
        currentUser: {}
      };
    default:
      return newState;
  }
};
