import React from 'react';
import PropTypes from 'prop-types';

const Tab = props => (
  <a
    className={
      props.isActive ?
        'nav-item nav-link active' :
        'nav-item nav-link'}
    id="tab"
    data-toggle="tab"
    role="tab"
    aria-controls="tab"
    aria-selected="false"
    onClick={props.handleClick}
    href={`#${props.tabOption}`}
  >
    {props.tabOption.name}
  </a>
);

Tab.defaultProps = {
  isActive: false
};

Tab.propTypes = {
  isActive: PropTypes.bool,
  tabOption: PropTypes.objectOf(PropTypes.any).isRequired,
  handleClick: PropTypes.func.isRequired
};

export default Tab;
