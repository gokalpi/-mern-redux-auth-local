import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import { isAuthenticatedSelector, logoutUser } from '../../features/auth/auth.slice';

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  function logout() {
    dispatch(logoutUser());
    history.push('/');
  }

  return (
    <header className='p-3 mb-3 border-bottom'>
      <div className='container'>
        <div className='d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start'>
          <a href='/' className='d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none'>
            LOGO
          </a>
          <ul className='nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0'>
            {isAuthenticated && (
              <li>
                <Link to='/users' className='nav-link px-2 text-secondary'>
                  Users
                </Link>
              </li>
            )}
          </ul>
          {isAuthenticated ? (
            <div className='flex-shrink-0 dropdown'>
              <a
                href='#'
                className='d-block link-dark text-decoration-none dropdown-toggle'
                id='dropdownUser2'
                data-bs-toggle='dropdown'
                aria-expanded='false'
                title=''
              >
                <img src='https://github.com/mdo.png' alt='mdo' width='32' height='32' className='rounded-circle' />
              </a>
              <ul className='dropdown-menu text-small shadow' aria-labelledby='dropdownUser2'>
                <li>
                  <Link to='/settings' className='dropdown-item'>
                    Settings
                  </Link>
                </li>
                <li>
                  <Link to='/profile' className='dropdown-item'>
                    Profile
                  </Link>
                </li>
                <li>
                  <hr className='dropdown-divider' />
                </li>
                <li>
                  <a href='#' className='dropdown-item' onClick={() => logout()}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <div className='col-md-3 text-end'>
              <Link to='/login' className='btn btn-outline-primary me-2'>
                Login
              </Link>
              <Link to='/register' className='btn btn-primary'>
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
