import Immutable from 'seamless-immutable';

export const Types = {
  GET_REQUEST: 'home/GET_REQUEST',
  GET_SUCCESS: 'home/GET_SUCCESS',
  GET_FAILURE: 'home/GET_FAILURE',
};

const initialState = Immutable({
  loading: false,
  error: false,
  data: [],
});

export const Creators = {
  getHomeRequest: () => ({
    type: Types.GET_REQUEST,
  }),

  getHomeSuccess: data => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),

  getHomeFailure: () => ({
    type: Types.GET_FAILURE,
  }),
};

const home = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case Types.GET_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };

    case Types.GET_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};

export default home;
