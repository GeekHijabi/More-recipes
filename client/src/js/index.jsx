import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import './../styles/index.scss';
import NotFound from './components/notfound';
import Home from './sample';
import Homepage from './components/home/homepage';
import SignIn from './components/auth/signin';
import SignUp from './components/auth/signup';


render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route path="/home" component={Home} />
      <Route path="/signIn" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>, document.getElementById('main')
);
