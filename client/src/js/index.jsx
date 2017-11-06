import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import configureStore from './store/configureStore';
import './../styles/index.scss';


import NotFound from './components/NotFound';
import Homepage from './components/Home';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import Recipes from './components/DashBoard/Recipes/index';
import MyProfile from './components/DashBoard/Profile/MyProfile';
import MyRecipe from './components/DashBoard/Profile/MyRecipe';
import AddRecipe from './components/DashBoard/RecipeAdmin/RecipeAdmin';

const store = configureStore();


render(
  <Provider store={store}>
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route path="/signIn" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route exact path="/recipes" component={Recipes} />
      <Route path="/recipes/detail/:id" component={MyRecipe} />
      <Route path="/profile" component={MyProfile} />
      <Route path="/dashboard" component={AddRecipe} />
      <Route component={NotFound} />
    </Switch>
  </HashRouter>
  </Provider>
  , document.getElementById('main')
  
);
