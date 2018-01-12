import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { apiGetAllFavoriteRecipes } from '../../actions/recipe';
import CardItem from '../Partials/CardItem';

/**
 *
 *
 * @class PopularRecipe
 * @extends {React.Component}
 */
class PopularRecipe extends React.Component {
  /**
   * @description COnstructor Function
   * @param {any} props
   * @memberof Home
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
  componentDidMount() {
    this.props.apiGetAllFavoriteRecipes(4);
  }
  /**
   * @description COnstructor Function
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  render() {
    const { favRecipes } = this.props;
    return (
      <div>
        <section id="list" className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 heading">
            <h4>
              <span>See what People Love this week</span>
            </h4>
          </div>
          {favRecipes.map(recipe =>
            <CardItem recipe={recipe} key={recipe.id} />)}
        </section>
      </div>
    );
  }
}

PopularRecipe.propTypes = {
  apiGetAllFavoriteRecipes: PropTypes.func.isRequired,
  favRecipes: PropTypes.arrayOf(PropTypes.any),
};

PopularRecipe.defaultProps = {
  favRecipes: []
};

/**
 *
 * @param {object} state
 *
 * @returns {void}
 */
function mapStateToProps(state) {
  return {
    favRecipes: state.recipe.favRecipes,
  };
}

export default connect(
  mapStateToProps,
  { apiGetAllFavoriteRecipes }
)(PopularRecipe);
