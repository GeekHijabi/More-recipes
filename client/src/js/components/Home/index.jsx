import React from 'react';
import Header from '../Partials/Header';
import Footer from '../Partials/Footer';
import TrendingRecipe from '../Partials/TrendingRecipes';
import Banner from '../Partials/Banner';

const HomePage = () => (
  <div>
    <Header />
    <Banner />
    <TrendingRecipe />
    <Footer />
  </div>
);

export default HomePage;
