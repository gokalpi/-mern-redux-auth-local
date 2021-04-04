import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { userSelector } from './auth.slice';

const ProfilePage = () => {
  const currentUser = useSelector(userSelector);

  if (!currentUser) {
    return <Redirect to='/login' />;
  }

  return (
    <div className='container'>
      <header className='jumbotron'>
        <h3>
          <strong>{currentUser.name}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <p>
        <strong>Role:</strong> {currentUser.role}
      </p>
    </div>
  );
};

export default ProfilePage;
