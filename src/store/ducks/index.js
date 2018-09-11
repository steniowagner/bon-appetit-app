import { combineReducers } from 'redux';

import nearbyRestaurants from './nearby-restaurants';
import searchRestaurants from './search-restaurants';

export default combineReducers({
  nearbyRestaurants,
  searchRestaurants,
});
