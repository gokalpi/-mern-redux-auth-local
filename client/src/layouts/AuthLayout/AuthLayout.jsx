import React from 'react';
import styles from './AuthLayout.module.scss';

const AuthLayout = ({ children }) => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className={styles.authBackgroundImage}></div>
        <div className='col-lg-5 col-sm-12'>
          <div className='container'>
            <div className={styles.rightSidebar}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;
