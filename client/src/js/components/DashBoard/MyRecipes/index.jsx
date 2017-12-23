import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RecipeHeader from '../../Partials/RecipeHeader';
import Footer from '../../Partials/Footer';
import AdminCardItem from '../../Partials/AdminCardItem';
import AddRecipeModal from '../../Partials/AddRecipeModal';
import { apiCreateRecipe,
  apiGetMyRecipe,
  apiEditRecipe,
  apiDeleteRecipe,
  onViewRecipe
} from '../../../actions/recipe';

/**
 *
 *
 * @class RecipeAdmin
 * @extends {React.Component}
 */
class RecipeAdmin extends React.Component {
  /**
   * @description Constructor Function
   * @param {any} props
   * @memberof RecipeAdmin
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.viewRecipe = this.viewRecipe.bind(this);
  }

  /**
 * @returns {void}
 *
 * @param {any} void
 * @memberof RecipeAdmin
 */
  componentWillMount() {
    this.props.apiGetMyRecipe();
  }

  /**
   * @returns {void}
   *
   * @param {integer} id
   * @memberof RecipeAdmin
   */
  onDelete(id) {
    this.props.apiDeleteRecipe(id);
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
   * @returns {void}
   *
   * @param {any} recipeId
   * @memberof RecipeAdmin
   */
  viewRecipe(recipeId) {
    this.props.onViewRecipe(recipeId);
    this.context.router.history.push(`/recipe/${recipeId}`);
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
              onKeyPress={this.handleKeyPress}
              className="fa fa-plus-circle fa-3x"
            />
          </div>
          <AddRecipeModal
            isOpen={this.state.modal}
            toggle={this.toggle}
            createRecipe={this.props.apiCreateRecipe}
          />
          <div className="row container-fluid mv-card">
            {this.props.myRecipes.map(recipe =>
              (<AdminCardItem
                recipe={recipe}
                key={recipe.id}
                editRecipe={this.props.apiEditRecipe}
                deleteRecipe={this.onDelete}
                onViewRecipe={this.viewRecipe}
              />))}
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}


RecipeAdmin.propTypes = {
  apiCreateRecipe: PropTypes.func.isRequired,
  apiGetMyRecipe: PropTypes.func.isRequired,
  apiDeleteRecipe: PropTypes.func.isRequired,
  apiEditRecipe: PropTypes.func.isRequired,
  onViewRecipe: PropTypes.func.isRequired,
  myRecipes: PropTypes.string.isRequired,
};

RecipeAdmin.contextTypes = {
  router: PropTypes.object.isRequired
};

/**
 *
 * @param {object} state
 *
 * @returns {void}
 */
function mapStateToProps(state) {
  return {
    myRecipes: state.recipe.myRecipes,
    recipe: state.recipe.recipe,
  };
}

export default connect(
  mapStateToProps,
  {
    apiCreateRecipe,
    apiGetMyRecipe,
    apiDeleteRecipe,
    apiEditRecipe,
    onViewRecipe
  }
)(RecipeAdmin);
