import React from 'react';
import Footer from './Partials/Footer';
import RecipeHeader from './Partials/RecipeHeader';

const image = require('../../assets/images/page-404.gif');

export const NotFound = () => (
  <div>
    <RecipeHeader />
    <div style={{ width: '85%', margin: '0 auto', minHeight: '795px' }}>
      <h4 className="pageStyle">Page Not Found</h4>
      <img
        className="error-page"
        src={image}
        alt="error-page"
      />
    </div>
    <Footer />
  </div>
);

export default NotFound;
