import Immutable from 'seamless-immutable';

export const Types = {
  GET_REQUEST: 'home/GET_REQUEST',
  GET_SUCCESS: 'home/GET_SUCCESS',
  GET_FAILURE: 'home/GET_FAILURE',
};

const initialState = Immutable({
  data: [],
  loading: false,
  error: null,
});

export default function home(state = initialState, action) {
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
  getHomeRequest: () => ({
    type: Types.GET_REQUEST,
  }),

  getHomeSuccess: data => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),

  getHomeFailure: error => ({
    type: Types.GET_FAILURE,
    payload: { error },
  }),
};
