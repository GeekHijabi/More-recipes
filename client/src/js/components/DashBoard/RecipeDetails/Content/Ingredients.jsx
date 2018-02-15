import React from 'react';
import PropTypes from 'prop-types';

export const Ingredients = ((props) => {
  const SplitIngredients = props.ingredients.split(',');
  return (
    <div
      className={
        props.activeTab.name === 'Ingredients' ?
        'tab-pane fade show active' :
        'tab-pane fade'
      }
      id="ingredients"
      role="tabpanel"
      aria-labelledby="ingredients-tab"
    >
      <div className="card">
        <div className="card-header">
        Ingredients
        </div>
        <ul className="list-group list-group-flush">
          {
            SplitIngredients.map((item, i) => (
              <li
                key={`ingredient ${i + 1}`}
                className="list-group-item"
              >{item}
              </li>))
          }
        </ul>
      </div>
    </div>
  );
});

Ingredients.defaultProps = {
  ingredients: '',
};

Ingredients.propTypes = {
  ingredients: PropTypes.string,
  activeTab: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Ingredients;
