import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import RecipeHeader from '../../Partials/RecipeHeader';
import CardItem from '../../Partials/CardItem';
import Footer from '../../Partials/Footer';

/**
 *
 *
 * @class Recipes
 * @extends {React.Component}
 */
class Recipes extends React.Component {
  /**
   * @description COnstructor Function
   * @param {any} props
   * @memberof Recipes
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      active: true
    };
  }
  /**
   * @description COnstructor Function
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  render() {
    return (
      <div>
        <RecipeHeader />
        <section>
          <CardItem />
        </section>
        <Footer />
      </div>
    );
  }
}

export default Recipes;
