import PropTypes from 'prop-types';
import React from 'react';
import Description from './Descriptions';
import Ingredients from './Ingredients';
import Reviews from './Reviews';

const Content = props => (
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
      recipeId={props.recipeId} //
    />
  </div>
);

PropTypes.Content = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  description: PropTypes.string.isRequired,

};

export default Content;
