import React from 'react';

const Ingredients = ((props) => {
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

export default Ingredients;
