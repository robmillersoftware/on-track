import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { devtools } from './devtools.config';
import { reducers } from '../components/reducers';
import * as appReducers from '../app.reducers';

export const reduxConfig = $ngReduxProvider => {
  'ngInject';
  $ngReduxProvider.createStoreWith(combineReducers({
    ...reducers,
    ...appReducers
  }), [thunk], devtools);
};
