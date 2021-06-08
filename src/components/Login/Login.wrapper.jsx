import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Backdrop } from '@material-ui/core';
import { performLogin } from './Login.actions';
import isAuthenticated from '../../utils/global';

import '../../globals/styles/login.css';

const LoginWrapper = () => {
  const [email, setemail] = useState();
  const history = useHistory();
  const dispatch = useDispatch();
  const [password, setpassword] = useState();
  useEffect(() => {
    const getauth = window.localStorage.getItem('authenticated');
    console.log(getauth);
  });

  const handlesubmit = () => {
    const data = { email, password };
    console.log(data);
    dispatch(performLogin({ email, password }));
    setTimeout(() => {
      const getauth = window.localStorage.getItem('authenticated');
      if (getauth === 'true') history.push('/');
    }, 100);
  };
  const ValidateEmail = () => {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email,
      )
    ) {
      return handlesubmit();
    }
    return console.log('invalid email');
  };
  const handleregister = () => {
    history.push('/register');
  };
  return (
    <div className="login">
      <div className="login-container">
        <center className="login-title">Login to XYZ</center>
        <div className="login-input-box">
          <input
            onChange={e => setemail(e.target.value)}
            placeholder="Enter Email"
          />
        </div>
        <div className="login-input-box">
          <input
            onChange={e => setpassword(e.target.value)}
            placeholder="Enter Password"
          />
        </div>
        <div className="login-button-box">
          <button onClick={ValidateEmail} type="submit">
            Submit
          </button>
        </div>
        <div className="login-button-box">
          <button type="button" onClick={handleregister}>
            {' '}
            New User ? Register Now
          </button>
        </div>
      </div>
    </div>
  );
};
export default LoginWrapper;
