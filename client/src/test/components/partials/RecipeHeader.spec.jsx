import React from 'react';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import RecipeHeader from '../../../js/components/Partials/RecipeHeader';

configure({ adapter: new Adapter() });

describe('RecipeHeader', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<RecipeHeader />);
    expect(wrapper).toMatchSnapshot();
  });
});
