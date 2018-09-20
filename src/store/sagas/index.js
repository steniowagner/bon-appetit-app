import { all, takeLatest } from 'redux-saga/effects';

import { Types as NearbyRestaurantsTypes } from 'store/ducks/nearby-restaurants';
import { Types as SearchRestaurantsTypes } from 'store/ducks/search-restaurants';
import { Types as RestaurantTypes } from 'store/ducks/restaurant';
import { Types as EventTypes } from 'store/ducks/events';
import { Types as HomeTypes } from 'store/ducks/home';
import { Types as DishTyes } from 'store/ducks/dish';

import { getNearbyRestaurantsRequest } from './nearby-restaurants';
import { searchRestaurantsRequest } from './search-restaurants';
import { requestAllEvents, getRestaurantsRequest } from './events';
import { restaurantRequest } from './restaurant';
import { homeRequest } from './home';
import { dishRequest } from './dish';

export default function* rootSaga() {
  return yield all([
    takeLatest(NearbyRestaurantsTypes.GET_REQUEST, getNearbyRestaurantsRequest),
    takeLatest(SearchRestaurantsTypes.GET_REQUEST, searchRestaurantsRequest),
    takeLatest(RestaurantTypes.GET_REQUEST, restaurantRequest),
    takeLatest(EventTypes.GET_RESTAURANTS_REQUEST, getRestaurantsRequest),
    takeLatest(EventTypes.GET_ALL_REQUEST, requestAllEvents),
    takeLatest(HomeTypes.GET_REQUEST, homeRequest),
    takeLatest(DishTyes.GET_REQUEST, dishRequest),
  ]);
}
