import Axios from 'axios';
import Api from '../../utils/Api';
import {
  REGISTER_FAILURE,
  REGISTER_INIT,
  REGISTER_SUCCESS,
} from './Register.constants';

const initRegisterCreator = () => ({
  type: REGISTER_INIT,
});
const SuccessfullyRegister = data => ({
  type: REGISTER_SUCCESS,
  payload: data,
});
const RegisterFailed = error => ({
  type: REGISTER_FAILURE,
  payload: error,
});

const performRegister = data => {
  return async (disptach, getState, { apiInstance }) => {
    disptach(initRegisterCreator());
    const getdata = data;
    console.log(apiInstance);
    try {
      const callapi = Axios.post('http://localhost:3001/users', getdata);
      console.log(callapi);
      disptach(SuccessfullyRegister(data));
    } catch (error) {
      console.log(error);
      disptach(RegisterFailed(error));
    }
  };
};

const dummy = () => {};

export { performRegister, dummy };
