import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { userSelector } from '../auth/auth.slice';

function SecurePage() {
  const user = useSelector(userSelector);

  return (
    <div className='col-lg-8 offset-lg-2'>
      <h1>Hi {user.name}!</h1>
      <p>
        <Link to='/logout'>Logout</Link>
      </p>
    </div>
  );
}

export default SecurePage;
