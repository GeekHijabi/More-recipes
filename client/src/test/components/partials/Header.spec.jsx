import React from 'react';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import Header from '../../../js/components/Partials/Header';

configure({ adapter: new Adapter() });

describe('RecipeHeader', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });
});
