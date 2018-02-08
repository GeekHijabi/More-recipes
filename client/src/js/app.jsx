import React from 'react';
import axios from 'axios';
import { Route, Switch, Redirect } from 'react-router-dom';

import NotFound from './components/NotFound';
import Homepage from './components/Home';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import Recipes from './components/RecipeList';
import Profile from './components/DashBoard/Profile';
import RecipeDetail from './components/DashBoard/RecipeDetails';
import MyRecipes from './components/DashBoard/MyRecipes';
import FavoriteRecipe from './components/FavoriteRecipeList';
import ForgotPassword from './components/Auth/ForgotPassword';


/**
 * @param {void} void
 * @return {object} date
 */
const isTokenExpired = () => {
  const token = localStorage.getItem('token');
  const date = new Date(0);
  date.setUTCDate(token.exp);
  return date < new Date();
};

  /**
   * @param {void} void
   * @return {object} authState
   */
const isAuthenticated = () => {
  axios.defaults.headers.common['x-token'] = localStorage.getItem('token');
  const authState = localStorage.getItem('token') !== null &&
      isTokenExpired !== true;
  return authState;
};

const App = () => (
  <Switch>
    <Route
      exact
      path="/"
      render={props =>
            (isAuthenticated() ?
            (<Homepage {...props} />)
            : (<Homepage {...props} />))}
    />
    <Route
      path="/signup"
      render={props =>
            (isAuthenticated() ?
            (<Redirect to={{ pathname: '/recipes' }} />)
            : (<SignUp {...props} />))}
    />
    <Route
      path="/signin"
      render={props =>
            (isAuthenticated() ?
            (<Redirect to={{ pathname: '/recipes' }} />)
            : (<SignIn {...props} />))}
    />
    <Route
      path="/forgot-password"
      render={props => (<ForgotPassword {...props} />)}
    />
    <Route
      exact
      path="/recipes"
      render={props =>
            (isAuthenticated() ?
            (<Recipes {...props} />)
            : (<Recipes {...props} />))}
    />
    <Route
      exact
      path="/recipe/:id"
      render={props =>
            (isAuthenticated() ? (<RecipeDetail {...props} />)
              : (<Redirect to={{ pathname: '/signin' }} />))}
    />
    <Route
      exact
      path="/profile"
      render={props =>
            (isAuthenticated() ? (<Profile {...props} />)
              : (<Redirect to={{ pathname: '/' }} />))}
    />
    <Route
      exact
      path="/favorites"
      render={props =>
            (isAuthenticated() ? (<FavoriteRecipe {...props} />)
              : (<Redirect to={{ pathname: '/' }} />))}
    />
    <Route
      exact
      path="/admin"
      render={props =>
            (isAuthenticated() ? (<MyRecipes {...props} />)
              : (<Redirect to={{ pathname: '/signin' }} />))}
    />
    <Route component={NotFound} />
  </Switch>
);
export default App;

