import {
  REGISTER_FAILURE,
  REGISTER_INIT,
  REGISTER_SUCCESS,
} from './Register.constants';

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

const RegisterReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case REGISTER_INIT:
      return { ...state, loading: true };
    case REGISTER_SUCCESS: {
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
    case REGISTER_FAILURE: {
      const errors = transformErrors(action.payload);
      return { ...state, loading: false, data: {}, errors };
    }
    default:
      return state;
  }
};

export default RegisterReducer;
