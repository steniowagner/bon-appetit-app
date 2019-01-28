import { call, put } from 'redux-saga/effects';

import { Creators as DishActions } from '~/store/ducks/dish';
import api from '~/services/api';

export function* requestDishDetail(action) {
  try {
    const { id } = action.payload;

    const response = yield call(api.get, `/dish/${id}`);

    yield put(DishActions.requestDishDetailSuccess(response.data));
  } catch (err) {
    yield put(DishActions.requestDishDetailFailure());
  }
}

export function* requestAllDishes() {
  try {
    const response = yield call(api.get, '/dish');

    yield put(DishActions.requestAllDishesSuccess(response.data.dishes));
  } catch (err) {
    yield put(DishActions.requestAllDishesFailure());
  }
}
