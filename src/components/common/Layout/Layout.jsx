// Layout.jsx (no-op wrapper to avoid duplicate hero/header)
import React from 'react';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      {children}
    </div>
  );
};
export default Layout;