import React from 'react';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import { Banner } from '../../../js/components/Partials/Banner';

configure({ adapter: new Adapter() });

const props = {
  history: {
    push: () => Promise.resolve({ ok: true }),
  }
};

describe('Banner', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Banner {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('onClick', () => {
  it('should click the link on the banner', () => {
    const event = {
      preventDefault: jest.fn()
    };
    const submit = shallow(<Banner {...props} />);
    submit.instance().onClick(event);
  });
});
