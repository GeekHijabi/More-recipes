import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { apiGetRecipe } from '../../actions/recipe';
import CardItem from '../Partials/CardItem';

/**
 *
 *
 * @class HandPickedRecipe
 * @extends {React.Component}
 */
export class TrendingRecipe extends React.Component {
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
 * @param {any} void
 * @memberof Recipes
 * @returns {void}
 */
  componentWillMount() {
    this.props.apiGetRecipe(0, 3, 'upvotes');
  }
  /**
   * @description COnstructor Function
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  render() {
    const { recipes } = this.props;
    return (
      <div style={{ width: '85%', margin: '0 6.5em' }}>
        <h4 className="heading">
          <span>Currently Trending</span>
        </h4>
        <div className="container-fluid">
          <div className="row">
            {recipes.map(recipe =>
              <CardItem recipe={recipe} key={recipe.id} />)}
          </div>
        </div>
      </div>
    );
  }
}

TrendingRecipe.propTypes = {
  apiGetRecipe: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.any),
};

TrendingRecipe.defaultProps = {
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
  };
}

export default connect(mapStateToProps, { apiGetRecipe })(TrendingRecipe);
