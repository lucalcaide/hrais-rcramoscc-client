import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ children, roles }) => {
  const [isValid, setIsValid] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        // Retrieve token from cookies
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        if (!token) {
          setIsValid(false);
          setRedirectPath('/');
          setLoading(false);
          return;
        }

        // Verify token with server
        const result = await axios.get('https://hrais-rcramoscc-server.onrender.com/verify', {
          headers: { 
            'Authorization': `Bearer ${token}`,
          },
          withCredentials: true
        });

        if (result.data.Status) {
          setIsValid(true);
          setUserRole(result.data.role);
        } else {
          setIsValid(false);
          setRedirectPath('/');
        }
      } catch (err) {
        setIsValid(false);
        setRedirectPath('/');
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Check localStorage for a valid session
  if (localStorage.getItem('valid') === 'true') {
    return children;
  }

  if (redirectPath) {
    return <Navigate to={redirectPath} />;
  }

  if (!isValid) {
    return <Navigate to="/" />;
  }

  if (roles && !roles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;
