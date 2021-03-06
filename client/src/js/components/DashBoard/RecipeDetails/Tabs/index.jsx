import React from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';

const tabOptions = [
  { id: 1, name: 'Ingredients', isActive: true },
  { id: 2, name: 'Descriptions', isActive: false },
  { id: 3, name: 'Reviews', isActive: false }
];

const Tabs = props => (
  <nav
    className="nav nav-tabs white"
    id="myTab"
    // role="tablist"
  >
    {
      tabOptions.map(tab => (
        <Tab
          tabOption={tab}
          key={tab.id}
          isActive={(props.activeTab === tab[0])}
          handleClick={() => props.changeTab(tab)}
        />
      ))
    }
    {props.isActive}
  </nav>
);

Tabs.defaultProps = {
  isActive: false
};

Tabs.propTypes = {
  isActive: PropTypes.bool,
  activeTab: PropTypes.objectOf(PropTypes.any).isRequired,
};


export default Tabs;
