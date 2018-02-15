import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { EditProfileModal }
  from '../../../js/components/Partials/EditProfileModal';

const userInput = {
  userName: 'test',
  bio: 'testing',
  summary: 'tester',
  imageUrl: ''
};

const props = {
  editProfile: jest.fn(() => Promise.resolve({ ok: true })),
  currentUser: {},
  toggle: jest.fn(() => Promise.resolve({ ok: true })),
  isOpen: true,
  isLoadingRecipe: true
};
describe('Component: EditProfileModal', () => {
  beforeEach(() => {
    global.toastr = {
      success: () => {},
      error: () => {}
    };
  });
  it('should recieve next props', () => {
    const spy = sinon.spy(EditProfileModal.prototype, 'componentWillReceiveProps');
    const nextProps = {
      currentUser:
        {
          userName: 'test',
          bio: 'testing',
          summary: 'tester',
          imageUrl: ''
        },

    };
    const wrapper = shallow(<EditProfileModal {...nextProps} />);
    wrapper.setProps({ prop: nextProps });
    expect(spy.calledOnce).toEqual(true);
  });
  describe('EditProfileModal snapshot', () => {
    it('should render correctly', () => {
      const wrapper = shallow(<EditProfileModal {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('onChange', () => {
    it('should change event', () => {
      const event = {
        target: { name: 'summary', value: 'tester' },
      };
      const wrapper = shallow(<EditProfileModal {...props} />);
      wrapper.instance().onChange(event);
      expect(wrapper.instance().state.summary).toBe('tester');
    });
  });

  describe('onSubmit', () => {
    it('should add recipe when recipe details is set to the state', () => {
      const event = {
        preventDefault: jest.fn()
      };
      const submit = shallow(<EditProfileModal {...props} />);
      submit.setState(userInput);
      submit.setState({ hasError: false });
      submit.instance().onSubmit(event);
    });
  });
});
