import React from 'react';
// import axios from 'axios';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import confirmAuth from './confirmAuth';
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
import ResetPassword from './components/Auth/ResetPassword';

const App = () => (
  <BrowserRouter>
    <div id="wrap">
      <Switch>
        <Route
          path="/"
          exact
          component={Homepage}
        />
        <Route
          path="/signup"
          component={SignUp}
        />
        <Route
          path="/signin"
          component={SignIn}
        />
        <Route
          path="/forgot-password"
          component={ForgotPassword}
        />

        <Route
          path="/reset-password"
          component={ResetPassword}
        />
        <Route
          exact
          path="/recipes"
          component={Recipes}
        />
        <Route
          exact
          path="/recipe/:id"
          component={confirmAuth(RecipeDetail)}
        />
        <Route
          exact
          path="/profile"
          component={confirmAuth(Profile)}
        />
        <Route
          exact
          path="/favorites"
          component={confirmAuth(FavoriteRecipe)}
        />
        <Route
          exact
          path="/admin"
          component={confirmAuth(MyRecipes)}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
);
export default App;

