import api from 'services/api';
import { call, put } from 'redux-saga/effects';

import { Creators as NearbyRestaurantsActions } from 'store/ducks/nearby-restaurants';

export function* getNearbyRestaurantsRequest(action) {
  try {
    const { dishesType, userLocation } = action.payload;

    const headers = {
      userLatitude: userLocation.latitude,
      userLongitude: userLocation.longitude,
    };

    const params = {
      dishesType,
    };

    const response = yield call(api.get, '/restaurants/nearby', { params, headers });

    yield put(NearbyRestaurantsActions.getNearbyRestaurantsSuccess(response.data));
  } catch (err) {
    yield put(NearbyRestaurantsActions.getNearbyRestaurantsFailure('Error when try to get nearby restaurants.'));
  }
}
