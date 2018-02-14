import React from 'react';
import { shallow } from 'enzyme';
import { NotFound } from '../../js/components/NotFound';


describe('NotFound snapshot', () => {
  it('should render correctly', () => {
    const notFound = shallow(<NotFound />);
    expect(notFound).toMatchSnapshot();
  });
});

