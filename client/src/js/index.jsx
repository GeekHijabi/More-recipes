import React from 'react';
import { render } from 'react-dom';
<<<<<<< HEAD
import { BrowserRouter, Match, Miss } from 'react-router';

import '../styles/_variables.scss';
import header from './components/partials/header';
import NotFound from './components/notfound';

const root = () => (
  <BrowserRouter>
    <div>
      <Match exactly pattern="/" component={header} />
      <Miss component={NotFound} />

    </div>
  </BrowserRouter>
);

render(<root />, document.getElementById('root'));

=======
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import './../styles/index.scss';
import NotFound from './components/NotFound';
import Homepage from './components/Home';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import Recipes from './components/DashBoard/Recipes/index';
import MyProfile from './components/DashBoard/Profile/MyProfile';
import MyRecipe from './components/DashBoard/Profile/MyRecipe';
import AddRecipe from './components/DashBoard/RecipeAdmin/RecipeAdmin';


render(
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
  </HashRouter>, document.getElementById('main')
);
>>>>>>> 4d6fd913656271b0926a670b2c6af06bec95200a
