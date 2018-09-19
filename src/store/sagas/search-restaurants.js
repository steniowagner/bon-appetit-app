import api from 'services/api';
import { call, put } from 'redux-saga/effects';
import { Creators as SearchRestaurantsActions } from 'store/ducks/search-restaurants';
import parseParams from './utils/parseParams';

export function* searchRestaurantsRequest(action) {
  try {
    const {
      userLocation,
      dishesTypes,
      maxDistance,
    } = action.payload;

    const headers = {
      userLatitude: userLocation.latitude,
      userLongitude: userLocation.longitude,
    };

    const paramsMerged = Object.assign({}, { dishesTypes }, { maxDistance });

    const response = yield call(api.get, '/restaurants/filter', {
      params: paramsMerged,
      paramsSerializer: params => parseParams(params),
      headers,
    });

    yield put(SearchRestaurantsActions.searchRestaurantsSuccess(response.data));
  } catch (err) {
    yield put(SearchRestaurantsActions.searchRestaurantsFailure('Error when try to get restaurants.'));
  }
}
