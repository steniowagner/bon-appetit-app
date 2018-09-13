import api from 'services/api';
import { call, put } from 'redux-saga/effects';

import { Creators as HomeActions } from 'store/ducks/home';

export function* homeRequest() {
  try {
    const response = yield call(api.get, '/home');

    yield put(HomeActions.getHomeSuccess(response.data));
  } catch (err) {
    yield put(HomeActions.getHomeFailure('Error when try to get home data.'));
  }
}
