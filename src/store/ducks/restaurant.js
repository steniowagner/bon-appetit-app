import Immutable from 'seamless-immutable';

export const Types = {
  GET_REQUEST: 'restaurant/GET_REQUEST',
  GET_SUCCESS: 'restaurant/GET_SUCCESS',
  GET_FAILURE: 'restaurant/GET_FAILURE',
  CLEAR: 'restaurant/CLEAR',
};

const initialState = Immutable({
  data: {},
  loading: false,
  error: null,
});

export default function restaurant(state = initialState, action) {
  switch (action.type) {
    case Types.GET_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case Types.GET_SUCCESS:
      return {
        data: action.payload,
        loading: false,
        error: null,
      };

    case Types.GET_FAILURE:
      return {
        data: {},
        error: action.payload.error,
        loading: false,
      };

    case Types.CLEAR:
      return {
        ...initialState,
      };

    default:
      return state;
  }
}

export const Creators = {
  getRestaurantRequest: (userLocation, id) => ({
    type: Types.GET_REQUEST,
    userLocation,
    id,
  }),

  getRestaurantSuccess: data => ({
    type: Types.GET_SUCCESS,
    payload: { ...data },
  }),

  getRestaurantFailure: error => ({
    type: Types.GET_FAILURE,
    payload: { error },
  }),

  clearState: () => ({
    type: Types.CLEAR,
  }),
};
