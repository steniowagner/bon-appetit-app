import Immutable from 'seamless-immutable';

export const Types = {
  GET_ALL_EVENTS_REQUEST: 'events/GET_ALL_EVENTS_REQUEST',
  GET_ALL_EVENTS_SUCCESS: 'events/GET_ALL_EVENTS_SUCCESS',
  GET_ALL_EVENTS_FAILURE: 'events/GET_ALL_EVENTS_FAILURE',
  GET_EVENT_DETAILS_REQUEST: 'events/GET_EVENT_DETAILS_REQUEST',
  GET_EVENT_DETAILS_SUCCESS: 'events/GET_EVENT_DETAILS_SUCCESS',
  GET_EVENT_DETAILS_FAILURE: 'events/GET_EVENT_DETAILS_FAILURE',
};

const INITIAL_STATE = Immutable({
  eventDetails: {},
  restaurants: [],
  loading: false,
  error: false,
  events: [],
});

export const Creators = {
  requestAllEvents: () => ({
    type: Types.GET_ALL_EVENTS_REQUEST,
  }),

  requestAllEventsSuccess: data => ({
    type: Types.GET_ALL_EVENTS_SUCCESS,
    payload: { data },
  }),

  requestAllEventsFailure: () => ({
    type: Types.GET_ALL_EVENTS_FAILURE,
  }),

  requestEventDetails: id => ({
    type: Types.GET_EVENT_DETAILS_REQUEST,
    payload: { id },
  }),

  requestEventDetailsSuccess: data => ({
    type: Types.GET_EVENT_DETAILS_SUCCESS,
    payload: { data },
  }),

  requestEventDetailsFailure: () => ({
    type: Types.GET_EVENT_DETAILS_FAILURE,
  }),
};

const events = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case Types.GET_ALL_EVENTS_REQUEST:
      return {
        ...INITIAL_STATE,
        loading: true,
      };

    case Types.GET_ALL_EVENTS_SUCCESS:
      return {
        ...state,
        events: payload.data.events,
        loading: false,
      };

    case Types.GET_ALL_EVENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case Types.GET_EVENT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case Types.GET_EVENT_DETAILS_SUCCESS:
      return {
        ...state,
        eventDetails: payload.data,
        loading: false,
      };

    case Types.GET_EVENT_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};

export default events;
