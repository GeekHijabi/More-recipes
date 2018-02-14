import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'toastr/build/toastr.min.css';
import 'font-awesome/css/font-awesome.min.css';
import jwt from 'jsonwebtoken';
import './../styles/index.scss';
import configureStore from './store/configureStore';
import App from './app';
import setToken from './utils/setToken';
import { setCurrentUser } from './actions/auth';

const store = configureStore();

if (localStorage.getItem('token')) {
  setToken(localStorage.getItem('token'));
  store.dispatch(setCurrentUser(jwt.decode(localStorage.getItem('token'))));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main')
);
