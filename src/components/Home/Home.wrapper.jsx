import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import isAuthenticated from '../../utils/global';
import '../../globals/styles/home.css';
import { signOut } from '../Login/Login.actions';
import UploadImg from '../Upload/UploadImg';

const HomeWrapper = () => {
  const [username, setusername] = useState('Usesrname');
  const data = useSelector(state => state.login.data.email);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      setusername(data);
    } else {
      history.push('/login');
    }
  });
  const handlelogout = () => {
    dispatch(signOut());
    history.push('/login');
  };
  return (
    <div className="home">
      {/* <ul className="home-header">
        <li>Home</li>
        <li>Service</li>
        <li>Add your Business</li>
        <li>Login</li>
      </ul> */}

      <UploadImg />
      <div className="login-button-box">
        <button type="button" onClick={handlelogout}>
          SignOut
        </button>
      </div>
    </div>
  );
};

export default HomeWrapper;
