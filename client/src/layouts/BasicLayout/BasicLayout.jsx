import React from 'react';

import Header from '../../components/Header/Header';
import styles from './BasicLayout.module.scss';

const BasicLayout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className='container pb-3'>{children}</main>
    </div>
  );
};
export default BasicLayout;
