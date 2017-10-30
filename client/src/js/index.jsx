import React from 'react';
import { render } from 'react-dom';
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

