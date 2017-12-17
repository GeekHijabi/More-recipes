import React from 'react';
import Tab from './Tab';
// import Content from '../Content';

const tabOptions = [
  { id: 1, name: 'Ingredients', isActive: true },
  { id: 2, name: 'Descriptions', isActive: false },
  { id: 3, name: 'Reviews', isActive: false }
];

const Tabs = props => (
  <nav
    className="nav nav-tabs white"
    id="myTab"
    role="tablist"
  >
    {
      tabOptions.map(tab => (
        <Tab
          tabOption={tab}
          key={tab.id}
          isActive={(props.activeTab === tab)}
          handleClick={() => props.changeTab(tab)}
        />
      ))
    }
    {props.isActive}
  </nav>
);

export default Tabs;
