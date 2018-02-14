import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedProfile, { Profile }
  from '../../../../js/components/DashBoard/Profile';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


const props = {
  apiUpdateUserProfile: jest.fn(() => Promise.resolve({ ok: true })),
  apiGetCurrentUser: jest.fn(() => Promise.resolve({ ok: true })),
  currentUser: {
    id: 1,
    userName: 'tester',
    bio: '',
    summary: ''
  }
};


describe('Profile snapshot', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Profile {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('toggle', () => {
  it('should toggle the modal', () => {
    const wrapper = shallow(<Profile {...props} />);
    wrapper.setState({ modal: true });
    wrapper.instance().toggle();
    expect(wrapper.state().modal).toEqual(false);
  });
});

describe('Connected Profile component', () => {
  it('component successfully rendered', () => {
    const store = mockStore({
      auth: {
        currentUser: {}
      }
    });
    const wrapper = shallow(<ConnectedProfile store={store} />);
    expect(wrapper.length).toBe(1);
  });
});
