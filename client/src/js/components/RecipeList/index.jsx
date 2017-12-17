import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RecipeHeader from '../Partials/RecipeHeader';
import CardItem from '../Partials/CardItem';
import Footer from '../Partials/Footer';
import { apiGetRecipe, apiUpVoteRecipe } from '../../actions/recipe';

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

    };
  }

  /**
 * @returns {void}
 *
 * @param {any} void
 * @memberof Recipes
 */
  componentWillMount() {
    this.props.apiGetRecipe();
  }

  /**
   * @description Constructor Function
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  render() {
    const { recipes } = this.props;
    return (
      <div>
        <RecipeHeader />
        <div className="row container-fluid mv-card">
          {recipes.map(recipe =>
            <CardItem recipe={recipe} key={recipe.id} />)}
        </div>
        <Footer />
      </div>
    );
  }
}

Recipes.propTypes = {
  apiGetRecipe: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.object)
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
    recipes: state.recipe.recipes
  };
}

export default connect(mapStateToProps, { apiGetRecipe })(Recipes);
