import moxios from 'moxios';
import toastr from 'toastr';
import $ from 'jquery';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { LocalStorage } from './__mocks__/localStorageMock';

configure({ adapter: new Adapter() });

process.env.NODE_ENV = 'test';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


global.moxios = moxios;
global.mockStore = mockStore;
global.$ = $;
global.jQuery = $;
global.toastr = toastr;
global.navigator = {
  userAgent: 'node.js'
};

const documentRef = document;
