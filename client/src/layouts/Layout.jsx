import React from 'react';

const Layout = ({ layout: Layout, isPublic, children }) => {
  const token = localStorage.getItem('token');
  if (isPublic === true || token) return <Layout>{children}</Layout>;
  return <>{children}</>;
};

export default Layout;
