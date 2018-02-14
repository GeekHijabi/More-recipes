import React from 'react';
import { shallow } from 'enzyme';
import { AdminCardItem }
  from '../../../js/components/Partials/AdminCardItem';


const props = {
  deleteRecipe: jest.fn(() => Promise.resolve({ ok: true })),
  editRecipe: jest.fn(() => Promise.resolve({ ok: true })),
  recipe: {
    id: 1,
    recipeName: 'rice',
    imageUrl: '',
    upvotes: 0,
    downvotes: 0,
    favoriteCount: 2,
    views: 2
  },
};
describe('Component: AdminCardItem', () => {
  beforeEach(() => {
    global.toastr = {
      success: () => {},
      error: () => {}
    };
    global.swal = {
      success: () => {},
      error: () => {}
    };
  });


  describe('onDelete', () => {
    it('should remove the recipe', () => {
      const wrapper = shallow(<AdminCardItem {...props} />);
      wrapper.instance().onDelete();
      expect(props.deleteRecipe.mock.calls.length).toEqual(0);
    });
  });

  describe('toggle', () => {
    it('should toggle the modal', () => {
      const wrapper = shallow(<AdminCardItem {...props} />);
      wrapper.setState({ modal: true });
      wrapper.instance().toggle();
      expect(wrapper.state().modal).toEqual(false);
    });
  });
});
