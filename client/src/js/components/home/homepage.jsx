import React from 'react';
import Header from '../partials/header';
import Footer from '../partials/footer';
import Card from '../home/cards';
import Banner from '../partials/banner';

class Homepage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Banner />
        <Card />
        <Footer />
      </div>
    );
  }
}

export default Homepage;
