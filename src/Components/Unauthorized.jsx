import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="text-center mt-5">
      <h1>403 Forbidden</h1>
      <p>You do not have permission to access this page.</p>
      <Link to="/login">Return</Link>
    </div>
  );
};

export default Unauthorized;