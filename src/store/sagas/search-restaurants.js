import { call, put } from 'redux-saga/effects';

import { Creators as SearchRestaurantsActions } from '~/store/ducks/search-restaurants';
import parseParams from './utils/parseParams';
import api from '~/services/api';

export function* requestSearchRestaurants(action) {
  try {
    const { userLocation, dishesTypes, maxDistance } = action.payload;

    const headers = {
      userLatitude: userLocation.latitude,
      userLongitude: userLocation.longitude,
    };

    const paramsMerged = Object.assign({}, { dishesTypes }, { maxDistance });

    const response = yield call(api.get, '/restaurant/filter', {
      paramsSerializer: params => parseParams(params),
      params: paramsMerged,
      headers,
    });

    yield put(
      SearchRestaurantsActions.requestSearchRestaurantsSuccess(response.data),
    );
  } catch (err) {
    yield put(SearchRestaurantsActions.requestSearchRestaurantsFailure());
  }
}
