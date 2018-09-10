import { all, takeLatest } from 'redux-saga/effects';

import { Types as NearbyRestaurantsTypes } from 'store/ducks/nearby-restaurants';

import { getNearbyRestaurantsRequest } from './nearby-restaurants';

export default function* rootSaga() {
  return yield all([
    takeLatest(NearbyRestaurantsTypes.GET_REQUEST, getNearbyRestaurantsRequest),
  ]);
}
