import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RecipeHeader from '../Partials/RecipeHeader';
import CardItem from '../Partials/CardItem';
import PopularRecipe from '../Partials/PopularRecipe';
import Footer from '../Partials/Footer';
import { apiGetRecipe } from '../../actions/recipe';

/**
 *
 *
 * @class Recipes
 * @extends {React.Component}
 */
class Recipes extends React.Component {
  // /**
  //  * @description COnstructor Function
  //  * @param {any} props
  //  * @memberof Recipes
  //  * @return {void}
  //  */
  // constructor(props) {
  //   super(props);
  //   this.state = {

  //   };
  // }

  /**
 * @returns {void}
 *
 * @param {any} void
 * @memberof Recipes
 */
  componentDidMount() {
    this.props.apiGetRecipe(6);
  }

  /**
   * @description Constructor Function
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  render() {
    const { recipes, search } = this.props;
    const recipeList = search.length === 0 ? recipes : search;
    return (
      <div>
        <RecipeHeader />
        <div className="row container-fluid mv-card">

          {recipeList.length === 0 && (<span>No recipe yet!</span>)}
          {recipeList.map(recipe =>
            <CardItem recipe={recipe} key={recipe.id} />)}
        </div>
        <PopularRecipe />
        <Footer />
      </div>
    );
  }
}

Recipes.propTypes = {
  apiGetRecipe: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.any),
  search: PropTypes.arrayOf(PropTypes.any).isRequired
};

Recipes.defaultProps = {
  recipes: []
};

/**
 *
 * @param {object} state
 *
 * @returns {void}
 */
function mapStateToProps(state) {
  return {
    recipes: state.recipe.recipes,
    search: state.recipe.SearchResults
  };
}

export default connect(mapStateToProps, { apiGetRecipe })(Recipes);
