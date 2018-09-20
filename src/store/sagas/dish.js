import api from 'services/api';
import { call, put } from 'redux-saga/effects';

import { Creators as DishActions } from 'store/ducks/dish';

export function* dishRequest(action) {
  try {
    const { id } = action;

    const response = yield call(api.get, `/dishes/${id}`);

    yield put(DishActions.getDishSuccess(response.data));
  } catch (err) {
    yield put(DishActions.getDishFailure('Error when try to get Dish data.'));
  }
}
