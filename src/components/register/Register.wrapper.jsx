import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import '../../globals/styles/login.css';
import { performRegister } from './Register.actions';

const RegisterWrapper = () => {
  const [email, setemail] = useState();
  const history = useHistory();
  const [firstname, setfirstname] = useState();
  const [lastname, setlastname] = useState();
  const [age, setage] = useState(20);
  const [password, setpassword] = useState();
  const dispatch = useDispatch();

  const handlesubmit = () => {
    const data = {
      firstname,
      lastname,
      age,
      email,
      password,
    };
    dispatch(performRegister(data));
    history.push('/');
    console.log(data);
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

  const handlelogin = () => {
    history.push('/login');
  };
  return (
    <div className="register">
      <div className="login-container">
        <center className="login-title">Register to XYZ</center>
        <div className="login-input-box">
          <input
            onChange={e => setfirstname(e.target.value)}
            placeholder="Enter firstname"
          />
        </div>
        <div className="login-input-box">
          <input
            onChange={e => setlastname(e.target.value)}
            placeholder="Enter Lastname"
          />
        </div>
        <div className="login-input-box">
          <input
            onChange={e => setemail(e.target.value)}
            placeholder="Enter Email"
          />
        </div>
        <div className="login-input-box">
          <input
            onChange={e => setage(parseInt(e.target.value, 10))}
            placeholder="Enter Age"
          />
        </div>
        <div className="login-input-box">
          <input
            onChange={e => setpassword(e.target.value)}
            placeholder="enter Password"
          />
        </div>
        <div className="login-button-box">
          <button onClick={ValidateEmail} type="submit">
            Submit
          </button>
        </div>
        <div className="login-button-box">
          <button type="button" onClick={handlelogin}>
            Already have an Account ?{' '}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterWrapper;
