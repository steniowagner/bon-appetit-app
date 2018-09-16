import Immutable from 'seamless-immutable';

export const Types = {
  GET_REQUEST: 'events/GET_REQUEST',
  GET_SUCCESS: 'events/GET_SUCCESS',
  GET_FAILURE: 'events/GET_FAILURE',
};

const initialState = Immutable({
  data: [],
  loading: false,
  error: null,
});

export default function events(state = initialState, action) {
  switch (action.type) {
    case Types.GET_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case Types.GET_SUCCESS:
      return {
        isEmpty: action.payload.data.length === 0,
        data: action.payload.data,
        loading: false,
        error: null,
      };

    case Types.GET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
}

export const Creators = {
  getEventsRequest: () => ({
    type: Types.GET_REQUEST,
  }),

  getEventsSuccess: data => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),

  getEventsFailure: error => ({
    type: Types.GET_FAILURE,
    payload: { error },
  }),
};
