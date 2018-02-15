import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedSearchBar, { SearchBar }
  from '../../../js/components/Partials/SearchBar';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


const props = {
  apiSearchRecipe: jest.fn(() => Promise.resolve({ ok: true })),
  searchItem: jest.fn(() => Promise.resolve({ ok: true }))
};
describe('Component: SearchBar', () => {
  beforeEach(() => {
    global.toastr = {
      success: () => {},
      error: () => {}
    };
  });

  describe('SearchBar in snapshot', () => {
    it('should render correctly', () => {
      const wrapper = shallow(<SearchBar {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('onChange', () => {
    it('should change event', () => {
      const event = {
        target: { name: 'SearchResults', value: 'rice' },
      };
      const wrapper = shallow(<SearchBar {...props} />);
      wrapper.instance().onChange(event);
      expect(wrapper.instance().state.SearchResults).toEqual('rice');
      expect(wrapper.instance().props.apiSearchRecipe).toBeCalled();
    });
  });

  describe('Connected SearchBar component', () => {
    it('component successfully rendered', () => {
      const store = mockStore({
        recipe: {
          searchResult: []
        }
      });
      const wrapper = shallow(<ConnectedSearchBar store={store} />);
      expect(wrapper.length).toBe(1);
    });
  });
});

