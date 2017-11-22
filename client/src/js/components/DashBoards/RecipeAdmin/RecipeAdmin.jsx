import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import RecipeHeader from '../../Partials/RecipeHeader';
import Footer from '../../Partials/Footer';
import AddRecipe from './AddRecipe';
import CardItem from '../../Partials/CardItem';

/**
 *
 *
 * @class MyProfile
 * @extends {React.Component}
 */
class RecipeAdmin extends React.Component {
  /**
   * @description COnstructor Function
   * @param {any} props
   * @memberof Home
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
        <CardItem />
        <AddRecipe />
        <Footer />
      </div>
    );
  }
}

export default RecipeAdmin;
