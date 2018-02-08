import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'toastr/build/toastr.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './../styles/index.scss';
import configureStore from './store/configureStore';
import App from './app';

const store = configureStore();

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('main')
);
