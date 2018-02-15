import expect from 'expect';
import auth from '../../js/reducers/auth';
import * as actions from '../../js/actions/auth';
import initialState from '../../js/utils/initialState';

describe('Auth reducer', () => {
  it('should return the initial state', () => {
    expect(auth(undefined, {})).toEqual(initialState);
  });

  it('should sign up a new user when passed SIGNUP_USER_SUCCESS', () => {
    const newUser = {
      email: 'ddeedd@dd.com',
      userName: 'dddd'
    };
    const action = actions.signupSuccess(newUser);
    const newState = auth(initialState, action);
    expect(newState.currentUser).toEqual(newUser);
  });

  it('should return an error message when passed SIGNUP_USER_FAILURE', () => {
    const error = 'Password must be 8 characters or more';
    const action = actions.signupFailure(error);
    const newState = auth(initialState, action);
    expect(newState.errorMessage).toEqual(error);
  });


  it('should log in a user when passed LOGIN_USER_SUCCESS', () => {
    const message = 'You have successfully signed in!';
    const action = actions.loginSuccess(message);
    const newState = auth(initialState, action);
    expect(newState.isAuthenticated).toEqual(true);
    expect(newState.successMessage).toEqual(message);
  });

  it('should return an error message when passed LOGIN_USER_FAILURE', () => {
    const error = 'invalid credentials';
    const action = actions.loginFailure(error);
    const newState = auth(initialState, action);
    expect(newState.errorMessage).toEqual(error);
  });

  it('should set current user when SET_CURRENT_USER is dispatched', () => {
    const user = {
      id: 4,
      iat: 1517857694,
      exp: 1518030494
    };
    const action = actions.setCurrentUser(user);
    const newState = auth(initialState, action);
    expect(newState.currentUser).toEqual(user);
  });

  it('should remove current user when SET_CURRENT_USER is dispatched', () => {
    const user = { };
    const action = actions.removeCurrentUser(user);
    const newState = auth(initialState, action);
    expect(newState.currentUser).toEqual(user);
  });

  it('should log out user when LOG_OUT is dispatched', () => {
    const user = { };
    const action = actions.logoutSuccess(user);
    const newState = auth(initialState, action);
    expect(newState.currentUser).toEqual(user);
  });

  it('should update user when UPDATE_PROFILE_SUCCESS is dispatched', () => {
    const updatedUser = {
      updatedProfile: {
        bio: 'cute'
      }
    };
    const action = actions.updateProfileSuccess(updatedUser);
    const newState = auth(initialState, action);
    expect(newState.currentUser).toEqual(updatedUser.updatedProfile);
  });

  it('should return error when UPDATE_PROFILE_FAILURE is dispatched', () => {
    const error = 'profile not updated successfully';
    const action = actions.updateProfileFailure(error);
    const newState = auth(initialState, action);
    expect(newState.errorMessage).toEqual(error);
  });
});
