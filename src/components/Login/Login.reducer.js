import {
  LOGIN_INIT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from './Login.constants';

const DEFAULT_STATE = {
  loading: false,
  errors: [],
  authenticate: false,
  data: {},
};

const transformAndStoreLogingData = data => {
  return { ...data };
};

const transformErrors = data => {
  return [...data];
};

const LoginReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case LOGIN_INIT:
      return { ...state, loading: true };
    case LOGIN_SUCCESS: {
      const userData = transformAndStoreLogingData(action.payload);
      window.localStorage.setItem('authenticated', true);
      return {
        ...state,
        authenticate: true,
        loading: false,
        errors: [],
        data: userData,
      };
    }
    case LOGIN_FAILURE: {
      const errors = transformErrors(action.payload);
      return { ...state, loading: false, data: {}, errors };
    }
    case LOGOUT: {
      window.localStorage.setItem('authenticated', false);
      return {
        ...state,
        authenticate: false,
        errors: [],
        data: {},
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default LoginReducer;
