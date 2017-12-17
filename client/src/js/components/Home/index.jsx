import React from 'react';
import Header from '../Partials/Header';
import Footer from '../Partials/Footer';
import HandPickedRecipe from '../Partials/HandPickedRecipe';
import Banner from '../Partials/Banner';

const HomePage = () => (
  <div>
    <Header />
    <Banner />
    <HandPickedRecipe />
    <Footer />
  </div>
);

export default HomePage;
