import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import jsonwebtoken from 'jsonwebtoken';
import dataMock from '../__mocks__/dataMock';
import mockLocalStorage from '../__mocks__/localStorageMock';
import {
  apiRegisterUser,
  apiLoginUser,
  apiGetCurrentUser,
  LogoutUser,
  apiUpdateUserProfile,
  apiForgotPassword,
  apiResetPassword
} from '../../js/actions/auth';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  SET_CURRENT_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
  LOGOUT_USER_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  REMOVE_CURRENT_USER,
  UPDATE_PROFILE_FAILURE,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE
} from '../../js/constants';

const middleware = [thunk];

const mockStore = configureMockStore(middleware);

window.localStorage = mockLocalStorage;

describe('Auth action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it(
    'creates new user when SIGNUP_USER_SUCCESS is dispatched',
    (done) => {
      const { signupResponse, signupData } = dataMock;
      moxios.stubRequest('/api/v1/user/signup', {
        status: 201,
        response: signupResponse
      });
      const expectedActions = [{
        type: SIGNUP_USER_SUCCESS,
        user: signupResponse
      }];
      const store = mockStore({});
      store.dispatch(apiRegisterUser(signupData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    }
  );

  it('dispatches SIGNUP_USER_FAILURE when signup is unsuccessful', () => {
    const { signUpfailure } = dataMock;
    moxios.stubRequest('/api/v1/user/signup', {
      status: 500,
      errorMessage: signUpfailure
    });
    const expectedActions = [{
      type: SIGNUP_USER_FAILURE,
      errorMessage: signUpfailure.error

    }];
    const store = mockStore({});
    store.dispatch(apiRegisterUser({
      userName: '',
      email: 'abc@gmail.com',
      password: 'password'
    }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .catch((error) => {
        if (error.response) {
          return error.response.data;
        }
      });
  });


  it(
    'SET_CURRENT_USER when login is successful',
    (done) => {
      const { authResponse, signinData } = dataMock;
      moxios.stubRequest('/api/v1/user/signin', {
        status: 200,
        response: authResponse
      });
      const expectedActions = [
        {
          type: LOGIN_USER_SUCCESS,
          message: authResponse.message
        },
        {
          type: SET_CURRENT_USER,
          user: jsonwebtoken.decode(authResponse.token)
        }
      ];
      const store = mockStore({});
      store.dispatch(apiLoginUser(signinData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    }
  );

  it('dispatchees LOGIN_USER_FAILURE when sign in fails', (done) => {
    const { authResponse } = dataMock;
    moxios.stubRequest('/api/v1/user/signin', {
      status: 500,
      response: 'error'
    });
    const expectedActions = [{
      type: LOGIN_USER_FAILURE,
      error: 'error'
    }];
    const store = mockStore({});
    store.dispatch(apiLoginUser(authResponse))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it(
    'calls action SET_CURRENT_USER to get current user details',
    (done) => {
      const { getUserDetails } = dataMock;
      moxios.stubRequest(`/api/v1/user/${1}`, {
        status: 200,
        response: getUserDetails
      });
      const expectedActions = [
        {
          type: SET_CURRENT_USER,
          user: getUserDetails
        }];
      const store = mockStore({});
      store.dispatch(apiGetCurrentUser(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'dispatches UPDATE_PROFILE_FAILURE when getting current user fails',
    (done) => {
      moxios.stubRequest(`/api/v1/user/${1}`, {
        status: 500,
        error: 'error'
      });
      const expectedActions = [
        {
          type: UPDATE_PROFILE_FAILURE,
          error: 'error'
        }];
      const store = mockStore({});
      store.dispatch(apiGetCurrentUser(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'dispatches LOGOUT_USER_SUCCESS when logout action is successful',
    (done) => {
      const expectedActions = [
        {
          type: LOGOUT_USER_SUCCESS
        },
        {
          type: REMOVE_CURRENT_USER
        }
      ];

      const store = mockStore({});
      store.dispatch(LogoutUser());
      expect(store.getActions()).toEqual(expectedActions);
      done();
    }
  );

  it(
    'dispatches UPDATE_PROFILE_SUCCESS when user edit profile',
    (done) => {
      const { userProfileResponse, userProfileData } = dataMock;
      moxios.stubRequest(`/api/v1/user/${1}`, {
        status: 200,
        response: userProfileResponse
      });
      const expectedActions = [{
        type: UPDATE_PROFILE_SUCCESS,
        updatedUser: userProfileResponse.updatedProfile
      }];
      const store = mockStore({});
      store.dispatch(apiUpdateUserProfile(userProfileData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'dispatches FORGOT_PASSWORD_SUCCESS when user calls forgot password route',
    (done) => {
      const { forgotPasswordEmail, forgotPasswordResponse } = dataMock;
      moxios.stubRequest(`/api/v1/user/${1}`, {
        status: 200,
        email: forgotPasswordResponse
      });
      const expectedActions = [{
        type: FORGOT_PASSWORD_SUCCESS,
        email: forgotPasswordResponse
      }];
      const store = mockStore({});
      store.dispatch(apiForgotPassword(forgotPasswordEmail.id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'dispatches FORGOT_PASSWORD_FAILURE when user calls forgot password route',
    (done) => {
      const { forgotPasswordEmail } = dataMock;
      moxios.stubRequest(`/api/v1/user/${1}`, {
        status: 200,
        error: 'error'
      });
      const expectedActions = [{
        type: FORGOT_PASSWORD_FAILURE,
        error: 'error'
      }];
      const store = mockStore({});
      store.dispatch(apiForgotPassword(forgotPasswordEmail.id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'dispatches RESET_PASSWORD_SUCCESS when user calls forgot password route',
    (done) => {
      const { newPassword } = dataMock;
      moxios.stubRequest(`/api/v1/user/${1}`, {
        status: 200,
        newPasswordMessage: 'newpassword'
      });
      const expectedActions = [{
        type: RESET_PASSWORD_SUCCESS,
        newPasswordMessage: 'newpassword'
      }];
      const store = mockStore({});
      store.dispatch(apiResetPassword(newPassword))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'dispatches RESET_PASSWORD_FAILURE when user calls forgot password route',
    (done) => {
      const { forgotPasswordEmail } = dataMock;
      moxios.stubRequest(`/api/v1/user/${1}`, {
        status: 200,
        error: 'error'
      });
      const expectedActions = [{
        type: RESET_PASSWORD_FAILURE,
        error: 'error'
      }];
      const store = mockStore({});
      store.dispatch(apiResetPassword(forgotPasswordEmail.id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );
});
