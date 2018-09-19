import Immutable from 'seamless-immutable';

export const Types = {
  GET_ALL_REQUEST: 'events/GET_ALL_REQUEST',
  GET_ALL_SUCCESS: 'events/GET_ALL_SUCCESS',
  GET_ALL_FAILURE: 'events/GET_ALL_FAILURE',
  GET_RESTAURANTS_REQUEST: 'events/GET_RESTAURANTS_REQUEST',
  GET_RESTAURANTS_SUCCESS: 'events/GET_RESTAURANTS_SUCCESS',
  GET_RESTAURANTS_FAILURE: 'events/GET_RESTAURANTS_FAILURE',
};

const initialState = Immutable({
  loadingRestaurants: false,
  loadingAllEvents: false,
  errorRestaurants: null,
  errorAllEvents: null,
  restaurants: [],
  events: [],
});

export default function events(state = initialState, action) {
  switch (action.type) {
    case Types.GET_ALL_REQUEST:
      return {
        ...state,
        loadingAllEvents: true,
      };

    case Types.GET_ALL_SUCCESS:
      return {
        isEmpty: action.payload.data.events.length === 0,
        events: action.payload.data.events,
        loadingAllEvents: false,
        errorAllEvents: null,
      };

    case Types.GET_ALL_FAILURE:
      return {
        ...state,
        loadingAllEvents: false,
        errorAllEvents: action.payload.error,
      };

    case Types.GET_RESTAURANTS_REQUEST:
      return {
        ...state,
        loadingRestaurants: true,
        restaurants: [],
      };

    case Types.GET_RESTAURANTS_SUCCESS:
      return {
        ...state,
        loadingRestaurants: false,
        restaurants: action.payload.data.restaurants,
      };

    case Types.GET_RESTAURANTS_ERROR:
      return {
        ...state,
        loadingRestaurants: false,
        errorRestaurants: action.payload.error,
      };

    default:
      return state;
  }
}

export const Creators = {
  getAllEventsRequest: () => ({
    type: Types.GET_ALL_REQUEST,
  }),

  getAllEventsSuccess: data => ({
    type: Types.GET_ALL_SUCCESS,
    payload: { data },
  }),

  getAllEventsFailure: error => ({
    type: Types.GET_ALL_FAILURE,
    payload: { error },
  }),

  getRestaurantsRequest: (dishesTypes, restaurantsParticipating) => ({
    type: Types.GET_RESTAURANTS_REQUEST,
    payload: {
      restaurantsParticipating,
      dishesTypes,
    },
  }),

  getRestaurantsSuccess: data => ({
    type: Types.GET_RESTAURANTS_SUCCESS,
    payload: { data },
  }),

  getRestaurantsError: () => ({
    type: Types.GET_RESTAURANTS_ERROR,
  }),
};
