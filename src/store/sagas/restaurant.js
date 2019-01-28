import { call, put } from 'redux-saga/effects';

import { Creators as RestaurantActions } from '~/store/ducks/restaurant';
import api from '~/services/api';

export function* requestRestaurantDetail(action) {
  try {
    const { userLocation, id } = action.payload;

    const headers = {
      userLatitude: userLocation.latitude,
      userLongitude: userLocation.longitude,
    };

    const response = yield call(api.get, `/restaurant/${id}`, { headers });

    yield put(RestaurantActions.requestRestaurantDetailSuccess(response.data));
  } catch (err) {
    yield put(RestaurantActions.requestRestaurantDetailFailure());
  }
}
