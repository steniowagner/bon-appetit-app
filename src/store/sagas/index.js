import { all, takeLatest } from 'redux-saga/effects';

import { Types as NearbyRestaurantsTypes } from 'store/ducks/nearby-restaurants';
import { Types as SearchRestaurantsTypes } from 'store/ducks/search-restaurants';

import { getNearbyRestaurantsRequest } from './nearby-restaurants';
import { searchRestaurantsRequest } from './search-restaurants';

export default function* rootSaga() {
  return yield all([
    takeLatest(NearbyRestaurantsTypes.GET_REQUEST, getNearbyRestaurantsRequest),
    takeLatest(SearchRestaurantsTypes.GET_REQUEST, searchRestaurantsRequest),
  ]);
}
