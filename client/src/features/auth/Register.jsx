import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import './Auth.module.css';

import { errorSelector, isLoadingSelector, registerUser, userSelector } from './auth.slice';

function RegisterPage() {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(50, 'Password must be at most 50 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const history = useHistory();

  const error = useSelector(errorSelector);
  const isLoading = useSelector(isLoadingSelector);
  const user = useSelector(userSelector);

  function onSubmit(data) {
    dispatch(registerUser(data));
  }

  useEffect(() => {
    if (user) {
      history.push('/secure');
    }
  }, [user]);

  return (
    <div className='container'>
      <div className='form-register'>
        <h1>MERN Local Authentication</h1>
        <h2 className='h3 mb-3 fw-normal'>Please register</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-floating mb-4'>
            <input
              type='text'
              name='name'
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              placeholder='Name'
              ref={register}
            />
            <label htmlFor='name'>Name</label>
            {errors.name && <div className='invalid-feedback'>{errors.name?.message}</div>}
          </div>
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
          <div className='row mb-4'>
            <div className='form-floating col'>
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
            <div className='form-floating col'>
              <input
                name='confirmPassword'
                type='password'
                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                placeholder='Confirm Password'
                ref={register}
              />
              <label htmlFor='password'>Confirm Password</label>
              <div className='invalid-feedback'>{errors.confirmPassword?.message}</div>
            </div>
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-primary'>
              {isLoading && <span className='spinner-border spinner-border-sm mr-1'></span>}
              Register
            </button>
            <Link to='/login' className='btn btn-link'>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
