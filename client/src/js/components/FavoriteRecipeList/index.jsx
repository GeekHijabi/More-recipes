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
   * @description COnstructor Function
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
   * @description Constructor Function
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  render() {
    const { favorites } = this.props;
    return (
      <div>
        <RecipeHeader />
        <div className="row container-fluid mv-card">
          {favorites.map(favorite =>
            <CardItem recipe={favorite.Recipe} key={favorite.Recipe.id} />)}
        </div>
        <Footer />
      </div>
    );
  }
}

FavoriteRecipes.propTypes = {
  apiGetFavoriteRecipe: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
};

/**
 *
 * @param {object} state
 *
 * @returns {void}
 */
function mapStateToProps(state) {
  return {
    favorites: state.recipe.favorites,
  };
}

export default connect(mapStateToProps, { apiGetFavoriteRecipe })(FavoriteRecipes);
