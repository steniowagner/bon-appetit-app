import api from 'services/api';
import { call, put } from 'redux-saga/effects';

import { Creators as DishActions } from 'store/ducks/dish';

export function* requestSingleDish(action) {
  try {
    const { id } = action;

    const response = yield call(api.get, `/dishes/${id}`);

    yield put(DishActions.getSingleDishSuccess(response.data));
  } catch (err) {
    yield put(DishActions.getSingleDishFailure('Error when try to get Dish data.'));
  }
}

export function* requestAllDishes() {
  try {
    const response = yield call(api.get, '/dishes');

    yield put(DishActions.getAllDishesSuccess(response.data));
  } catch (err) {
    yield put(DishActions.getAllDishesFailure('Error when try to get Dish data.'));
  }
}
