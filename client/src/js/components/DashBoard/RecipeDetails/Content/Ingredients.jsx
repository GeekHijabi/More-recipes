import React from 'react';

const Ingredients = ((props) => {
  const SplitIngredients = props.ingredients.split(',');
  return (
    <div
      className={props.activeTab.name === 'Ingredients' ?
    'tab-pane fade show active' :
    'tab-pane fade'}
      id="ingredients"
      role="tabpanel"
      aria-labelledby="ingredients-tab"
    >
      {SplitIngredients.map((item, i) => (
        <li key={`ingredient ${i + 1}`}>{item}
        </li>))}
    </div>
  );
});

export default Ingredients;
