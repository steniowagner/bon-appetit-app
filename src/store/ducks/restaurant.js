import Immutable from 'seamless-immutable';

export const Types = {
  GET_DETAIL_REQUEST: 'restaurant/GET_DETAIL_REQUEST',
  GET_DETAIL_REQUEST_SUCCESS: 'restaurant/GET_DETAIL_REQUEST_SUCCESS',
  GET_DETAIL_REQUEST_FAILURE: 'restaurant/GET_DETAIL_REQUEST_FAILURE',
};

const initialState = Immutable({
  loading: false,
  error: false,
  data: {},
});

export const Creators = {
  requestRestaurantDetailRequest: (userLocation, id) => ({
    type: Types.GET_DETAIL_REQUEST,
    payload: { userLocation, id },
  }),

  requestRestaurantDetailSuccess: data => ({
    type: Types.GET_DETAIL_REQUEST_SUCCESS,
    payload: { ...data },
  }),

  requestRestaurantDetailFailure: () => ({
    type: Types.GET_DETAIL_REQUEST_FAILURE,
  }),
};

const restaurant = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case Types.GET_DETAIL_REQUEST_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
      };

    case Types.GET_DETAIL_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};

export default restaurant;
