import Axios from 'axios';
import {
  LOGIN_INIT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from './Login.constants';

const initLoginCreator = () => ({
  type: LOGIN_INIT,
});
const SuccessfullyLogin = data => ({
  type: LOGIN_SUCCESS,
  payload: data,
});
const LoginFailed = data => ({
  type: LOGIN_FAILURE,
  payload: data,
});

const performLogin = ({ email, password }) => {
  return async (disptach, getState, { apiInstance }) => {
    disptach(initLoginCreator());
    const data = { email, password };

    const callapi = await Axios.get(
      `http://localhost:3001/users?email=${email}`,
    );
    const response = callapi.status;
    if (response === 200) {
      if (callapi.data[0].password === password) {
        disptach(SuccessfullyLogin(data));
      } else {
        console.log(callapi.data[0].password, password);

        console.log('incorrect pass');
      }
    } else {
      disptach(LoginFailed(callapi.data));
    }
  };
};
const signOut = () => {
  return async disptach => {
    disptach({
      type: LOGOUT,
    });
  };
};

const dummy = () => {};

export { performLogin, signOut, dummy };
