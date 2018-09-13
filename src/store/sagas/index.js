import { all, takeLatest } from 'redux-saga/effects';

import { Types as NearbyRestaurantsTypes } from 'store/ducks/nearby-restaurants';
import { Types as SearchRestaurantsTypes } from 'store/ducks/search-restaurants';
import { Types as HomeTypes } from 'store/ducks/home';

import { getNearbyRestaurantsRequest } from './nearby-restaurants';
import { searchRestaurantsRequest } from './search-restaurants';
import { homeRequest } from './home';

export default function* rootSaga() {
  return yield all([
    takeLatest(NearbyRestaurantsTypes.GET_REQUEST, getNearbyRestaurantsRequest),
    takeLatest(SearchRestaurantsTypes.GET_REQUEST, searchRestaurantsRequest),
    takeLatest(HomeTypes.GET_REQUEST, homeRequest),
  ]);
}
