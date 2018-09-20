import { combineReducers } from 'redux';

import nearbyRestaurants from './nearby-restaurants';
import searchRestaurants from './search-restaurants';
import restaurant from './restaurant';
import events from './events';
import dish from './dish';
import home from './home';

export default combineReducers({
  nearbyRestaurants,
  searchRestaurants,
  restaurant,
  events,
  dish,
  home,
});
