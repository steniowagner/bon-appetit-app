import api from 'services/api';
import { call, put } from 'redux-saga/effects';
import { Creators as EventsActions } from 'store/ducks/events';
import parseParams from './utils/parseParams';

export function* requestAllEvents() {
  try {
    const response = yield call(api.get, '/event');

    yield put(EventsActions.getAllEventsSuccess(response.data));
  } catch (err) {
    yield put(EventsActions.getAllEventsFailure('Error when try to get Events data.'));
  }
}

export function* getRestaurantsRequest(action) {
  try {
    const { dishesTypes, restaurantsParticipating } = action.payload;

    const paramsMerged = Object.assign({}, { dishesTypes }, { restaurantsParticipating });

    const response = yield call(api.get, '/event/restaurants', {
      paramsSerializer: params => parseParams(params),
      params: paramsMerged,
    });

    yield put(EventsActions.getRestaurantsSuccess(response.data));
  } catch (err) {
    yield put(EventsActions.getRestaurantsError('Error when try to get Event data.'));
  }
}
