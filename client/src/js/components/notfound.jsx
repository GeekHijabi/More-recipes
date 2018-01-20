import React from 'react';
import RecipeHeader from '../components/Partials/RecipeHeader';
import Footer from '../components/Partials/Footer';

const defaultImage = require('../../assets/images/404.jpg');

/**
 *
 *
 * @class NotFound
 * @extends {React.Component}
 */
class NotFound extends React.Component {
  /**
   * @description Constructor Function
   * @param {any} props
   * @memberof AdminCardItem
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  /**
   * @description Render Method
   *
   * @memberof NotFound
   * @return {dom} DomElement
   */
  render() {
    return (
      <div>
        <RecipeHeader />
        <img src={defaultImage} alt="Card" style={{ width: '100%', height: '250%' }} />
        <Footer />
      </div>
    );
  }
}
export default NotFound;
