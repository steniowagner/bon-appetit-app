import Immutable from 'seamless-immutable';

export const Types = {
  GET_REQUEST: 'search-restaurants/GET_REQUEST',
  GET_SUCCESS: 'search-restaurants/GET_SUCCESS',
  GET_FAILURE: 'search-restaurants/GET_FAILURE',
};

const initialState = Immutable({
  data: [],
  loading: false,
  notFound: false,
  error: null,
});

export default function searchRestaurants(state = initialState, action) {
  switch (action.type) {
    case Types.GET_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case Types.GET_SUCCESS:
      return {
        data: action.payload.data,
        notFound: action.payload.data.restaurants.length === 0,
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
  searchRestaurantsRequest: (params) => {
    const {
      dishesTypes,
      maxDistance,
      userLocation,
    } = params;

    return ({
      type: Types.GET_REQUEST,
      payload: {
        dishesTypes,
        maxDistance,
        userLocation,
      },
    });
  },

  searchRestaurantsSuccess: data => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),

  searchRestaurantsFailure: error => ({
    type: Types.GET_FAILURE,
    payload: { error },
  }),
};
