import { call, put } from 'redux-saga/effects';

import { Creators as EventsActions } from '~/store/ducks/events';
import api from '~/services/api';

export function* requestAllEvents() {
  try {
    const { data } = yield call(api.get, '/event');

    yield put(EventsActions.requestAllEventsSuccess(data));
  } catch (err) {
    yield put(EventsActions.requestAllEventsFailure());
  }
}

export function* requestEventDetails(action) {
  try {
    const { id } = action.payload;

    const { data } = yield call(api.get, `/event/${id}`);

    yield put(
      EventsActions.requestEventDetailsSuccess({
        restaurants: data.restaurants,
        details: data.event,
      }),
    );
  } catch (err) {
    yield put(EventsActions.requestEventDetailsFailure());
  }
}
