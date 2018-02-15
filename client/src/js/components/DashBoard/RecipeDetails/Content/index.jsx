import PropTypes from 'prop-types';
import React from 'react';
import Description from './Descriptions';
import Ingredients from './Ingredients';
import Reviews from './Reviews';

export const Content = props => (
  <div
    className="tab-content"
    id="myTabContent"
  >
    <Description
      description={props.recipe.description}
      activeTab={props.activeTab}
    />
    <Ingredients
      ingredients={props.recipe.ingredients}
      activeTab={props.activeTab}
    />
    <Reviews
      reviewedRecipe={props.reviewedRecipe}
      activeTab={props.activeTab}
      recipeId={props.recipeId}
    />
  </div>
);

Content.defaultProps = {
  description: '',
  ingredients: '',
  recipeId: 0
};

Content.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  description: PropTypes.string,
  ingredients: PropTypes.string,
  activeTab: PropTypes.objectOf(PropTypes.any).isRequired,
  reviewedRecipe: PropTypes.objectOf(Array).isRequired,
  recipeId: PropTypes.number

};

export default Content;
