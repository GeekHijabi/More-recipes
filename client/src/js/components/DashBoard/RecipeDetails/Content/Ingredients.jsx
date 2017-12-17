import React from 'react';

const Ingredients = props => (
  <div
    className={props.activeTab.name === 'Ingredients' ?
    'tab-pane fade show active' :
    'tab-pane fade'}
    id="ingredients"
    role="tabpanel"
    aria-labelledby="ingredients-tab"
  >
    <p>
      {props.ingredients}
    </p>
  </div>
);

export default Ingredients;
