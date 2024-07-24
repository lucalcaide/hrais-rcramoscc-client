import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(!!localStorage.getItem('valid'));

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'valid' && !event.newValue) {
        setIsValid(false);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return isValid ? children : <Navigate to="/login" />;
};

export default PrivateRoute;