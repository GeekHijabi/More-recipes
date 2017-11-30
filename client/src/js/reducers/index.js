import { combineReducers } from 'redux';
import auth from '../reducers/auth';
import recipe from '../reducers/recipe';

const rootReducer = combineReducers({
  auth,
  recipe
});

export default rootReducer;
