import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RecipeHeader from '../Partials/RecipeHeader';
import CardItem from '../Partials/CardItem';
import Footer from '../Partials/Footer';
import { apiGetFavoriteRecipe } from '../../actions/recipe';

/**
 *
 *
 * @class Recipes
 * @extends {React.Component}
 */
class FavoriteRecipes extends React.Component {
  /**
   * @description constructor function
   * @param {any} props
   * @memberof Recipes
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  /**
 * @returns {void}
 *
 * @param {any} void
 * @memberof Recipes
 */
  componentWillMount() {
    this.props.apiGetFavoriteRecipe();
  }

  /**
   * @description constructor function
   * @param {any} props
   * @memberof FavoriteRecipeList
   * @return {array} favorite recipes
   */
  render() {
    const { favorites } = this.props;
    return (
      <div>
        <RecipeHeader />
        <div style={{ width: '85%', margin: '0 auto', minHeight: '760px' }}>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 heading">
            <h4>
              <span>My Favorite Recipes</span>
            </h4>
          </div>
          <div className="row">
            {favorites.length === 0 && (
            <span className="styleText">You do not have any favorite recipe yet!
            </span>)}
            {favorites.map(favorite =>
              <CardItem recipe={favorite.Recipe} key={favorite.Recipe.id} />)}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

FavoriteRecipes.propTypes = {
  apiGetFavoriteRecipe: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.any).isRequired,
};

/**
 *
 * @param {object} state
 * @returns {array} state
 */
function mapStateToProps(state) {
  return {
    favorites: state.recipe.favorites,
  };
}

export default connect(
  mapStateToProps,
  { apiGetFavoriteRecipe }
)(FavoriteRecipes);
