import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import configureStore from './store/configureStore';
import './../styles/index.scss';
import '../../../node_modules/toastr/build/toastr.min.css';


import NotFound from './components/NotFound';
import Homepage from './components/Home';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import Recipes from './components/RecipeList';
import MyProfile from './components/DashBoard/Profile/MyProfile';
import RecipeDetail from './components/DashBoard/RecipeDetails';
import MyRecipes from './components/DashBoard/MyRecipes';

const store = configureStore();


render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route exact path="/recipes" component={Recipes} />
        <Route path="/recipes/detail/:id" component={RecipeDetail} />
        <Route exact path="/profile" component={MyProfile} />
        <Route path="/admin" component={MyRecipes} />
        <Route component={NotFound} />
      </Switch>
    </HashRouter>
  </Provider>
  , document.getElementById('main')

);
