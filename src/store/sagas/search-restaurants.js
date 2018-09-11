import api from 'services/api';
import { call, put } from 'redux-saga/effects';

import { Creators as SearchRestaurantsActions } from 'store/ducks/search-restaurants';

const parseParams = (params) => {
  const keys = Object.keys(params);
  let options = '';

  keys.forEach((key) => {
    const isParamTypeObject = typeof params[key] === 'object';
    const isParamTypeArray = isParamTypeObject && (params[key].length >= 0);

    if (!isParamTypeObject) {
      options += `${key}=${params[key]}&`;
    }

    if (isParamTypeObject && isParamTypeArray) {
      if (params[key].length === 0) {
        options += `${key}=all&`;
      }

      params[key].forEach((element) => {
        options += `${key}=${element}&`;
      });
    }
  });

  return options ? options.slice(0, -1) : options;
};

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
