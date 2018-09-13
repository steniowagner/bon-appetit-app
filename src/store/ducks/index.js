import { combineReducers } from 'redux';

import nearbyRestaurants from './nearby-restaurants';
import searchRestaurants from './search-restaurants';
import home from './home';

export default combineReducers({
  nearbyRestaurants,
  searchRestaurants,
  home,
});
