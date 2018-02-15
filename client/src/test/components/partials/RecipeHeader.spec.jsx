import React from 'react';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { RecipeHeader } from '../../../js/components/Partials/RecipeHeader';
import mockLocalStorage from '../../__mocks__/localStorageMock';

window.localStorage = mockLocalStorage;

configure({ adapter: new Adapter() });

const props = {
  LogoutUser: jest.fn(() => Promise.resolve({ ok: true })),
  history: {
    push: () => Promise.resolve({ ok: true }),
  }
};

describe('RecipeHeader', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<RecipeHeader {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('onClick', () => {
  it('should click the link', () => {
    const event = {
      preventDefault: jest.fn()
    };
    const submit = shallow(<RecipeHeader {...props} />);
    submit.instance().onClick(event);
  });
});
