import api from 'services/api';
import { call, put } from 'redux-saga/effects';

import { Creators as RestaurantActions } from 'store/ducks/restaurant';

export function* restaurantRequest(action) {
  try {
    const { userLocation, id } = action;

    const headers = {
      userLatitude: userLocation.latitude,
      userLongitude: userLocation.longitude,
    };

    const response = yield call(api.get, `/restaurants/${id}`, { headers });

    yield put(RestaurantActions.getRestaurantSuccess(response.data));
  } catch (err) {
    yield put(RestaurantActions.getRestaurantFailure('Error when try to read Restaurant data.'));
  }
}
