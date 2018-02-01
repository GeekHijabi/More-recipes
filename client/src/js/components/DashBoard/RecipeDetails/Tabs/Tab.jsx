import React from 'react';

const Tab = props => (
  <a
    className={
      props.isActive ?
        'nav-item nav-link active' :
        'nav-item nav-link'}
    id="ingredients-tab"
    data-toggle="tab"
    role="tab"
    aria-controls="ingredients"
    aria-selected="false"
    onClick={props.handleClick}
    href={`#${props.tabOption}`}
  >
    {props.tabOption.name}
  </a>
);

export default Tab;
