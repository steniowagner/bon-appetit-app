import { call, put } from 'redux-saga/effects';

import { Creators as HomeActions } from '~/store/ducks/home';
import api from '~/services/api';

export function* homeRequest() {
  try {
    const response = yield call(api.get, '/home');

    yield put(HomeActions.getHomeSuccess(response.data));
  } catch (err) {
    yield put(HomeActions.getHomeFailure());
  }
}
