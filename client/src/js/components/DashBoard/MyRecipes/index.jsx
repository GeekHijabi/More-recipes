import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RecipeHeader from '../../Partials/RecipeHeader';
import Footer from '../../Partials/Footer';
import AdminCardItem from '../../Partials/AdminCardItem';
import AddRecipeModal from '../../Partials/AddRecipeModal';
import { apiCreateRecipe, apiGetRecipe } from '../../../actions/recipe';

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
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  /**
 * @returns {void}
 *
 * @param {any} void
 * @memberof RecipeAdmin
 */
  componentWillMount() {
    this.props.apiGetRecipe();
  }

  /**
 * @returns {void}
 *
 * @param {any} event
 * @memberof RecipeAdmin
 */
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
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
        <section id="list" className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 heading">
            <h4>
              <span>My Recipe</span>
            </h4>
            <i
              role="button"
              tabIndex="-1"
              onClick={this.toggle}
              className="fa fa-plus-circle fa-3x"
            />
          </div>
          <AddRecipeModal
            isOpen={this.state.modal}
            toggle={this.toggle}
            createRecipe={this.props.apiCreateRecipe}
          />
          <div className="row container-fluid mv-card">
            {this.props.recipes.map(recipe =>
              <AdminCardItem recipe={recipe} key={recipe.id} />)}
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

RecipeAdmin.propTypes = {
  apiCreateRecipe: PropTypes.func.isRequired,
  apiGetRecipe: PropTypes.func.isRequired
};

/**
 *
 * @param {object} state
 *
 * @returns {void}
 */
function mapStateToProps(state) {
  return {
    recipes: state.recipe.recipes
  };
}

export default connect(mapStateToProps, { apiCreateRecipe, apiGetRecipe })(RecipeAdmin);
