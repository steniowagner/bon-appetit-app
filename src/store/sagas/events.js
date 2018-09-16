import api from 'services/api';
import { call, put } from 'redux-saga/effects';

import { Creators as EventsActions } from 'store/ducks/events';

export function* eventsRequest() {
  try {
    const response = yield call(api.get, '/event');

    yield put(EventsActions.getEventsSuccess(response.data));
  } catch (err) {
    yield put(EventsActions.getEventsFailure('Error when try to get Events data.'));
  }
}
