import Immutable from 'seamless-immutable';

export const Types = {
  GET_REQUEST: 'nearby-restaurants/GET_REQUEST',
  GET_SUCCESS: 'nearby-restaurants/GET_SUCCESS',
  GET_FAILURE: 'nearby-restaurants/GET_FAILURE',
};

const initialState = Immutable({
  data: [],
  loading: false,
  error: null,
});

export default function nearbyRestaurants(state = initialState, action) {
  switch (action.type) {
    case Types.GET_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case Types.GET_SUCCESS:
      return {
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
  getNearbyRestaurantsRequest: (dishesType, userLocation) => ({
    type: Types.GET_REQUEST,
    payload: {
      dishesType,
      userLocation,
    },
  }),

  getNearbyRestaurantsSuccess: data => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),

  getNearbyRestaurantsFailure: error => ({
    type: Types.GET_FAILURE,
    payload: { error },
  }),
};
