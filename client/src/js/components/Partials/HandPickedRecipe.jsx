import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { apiGetRecipe } from '../../actions/recipe';
import CardItem from '../Partials/CardItem';

/**
 *
 *
 * @class Banner
 * @extends {React.Component}
 */
class HandPickedRecipe extends React.Component {
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
  componentWillMount() {
    this.props.apiGetRecipe(4);
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
      <div>
        <section id="list" className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 heading">
            <h4>
              <span>This Week&rsquo;s Handpicked Recipes</span>
            </h4>
          </div>
          {recipes.map(recipe =>
            <CardItem recipe={recipe} key={recipe.id} />)}
        </section>
      </div>
    );
  }
}

HandPickedRecipe.propTypes = {
  apiGetRecipe: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.object),
};

HandPickedRecipe.defaultProps = {
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

export default connect(mapStateToProps, { apiGetRecipe })(HandPickedRecipe);
