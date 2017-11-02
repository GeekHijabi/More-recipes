import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
/**
 *
 *
 * @class MyProfile
 * @extends {React.Component}
 */
class AddRecipe extends React.Component {
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
        <div className="add-recipe ml-auto">
          <h3>
            <span><i className="fa fa-check-circle-o fa-3x" /></span>
            <h3>Add Recipe</h3>
          </h3>
        </div>
      </div>
    );
  }
}

export default AddRecipe;
