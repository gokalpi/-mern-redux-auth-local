import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import './Auth.module.css';

import { errorSelector, isLoadingSelector, loginUser, reset, userSelector } from './auth.slice';

function LoginPage() {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(50, 'Password must be at most 50 characters'),
  });

  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const history = useHistory();
  const location = useLocation();

  const error = useSelector(errorSelector);
  const isLoading = useSelector(isLoadingSelector);
  const user = useSelector(userSelector);

  function onSubmit(data) {
    dispatch(loginUser(data));
  }

  useEffect(() => {
    dispatch(reset());
  }, []);

  useEffect(() => {
    if (user) {
      const { from } = location.state || { from: { pathname: '/secure' } };
      history.push(from.pathname);
    }
  }, [user]);

  return (
    <div className='container'>
      <div className='form-signin'>
        <form className='p-5 border rounded-3 bg-light' onSubmit={handleSubmit(onSubmit)}>
          <h1>MERN Local Authentication</h1>
          <h2 className='h3 mb-3 fw-normal'>Please login</h2>

          {error && (
            <div className='form-group'>
              <div className='alert alert-danger' role='alert'>
                {error}
              </div>
            </div>
          )}

          <div className='form-floating mb-4'>
            <input
              type='email'
              name='email'
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder='Email'
              ref={register}
            />
            <label htmlFor='email'>Email address</label>
            {errors.email && <div className='invalid-feedback'>{errors.email?.message}</div>}
          </div>
          <div className='form-floating mb-4'>
            <input
              type='password'
              name='password'
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder='Password'
              ref={register}
            />
            <label htmlFor='password'>Password</label>
            {errors.password && <div className='invalid-feedback'>{errors.password?.message}</div>}
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-primary mr-1'>
              {isLoading && <span className='spinner-border spinner-border-sm mr-1'></span>}
              Login
            </button>
            <Link to='/register' className='btn btn-link'>
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
