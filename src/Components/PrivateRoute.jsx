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
        const result = await axios.get('https://hrais-rcramoscc-server.onrender.com/verify', {
          withCredentials: true // Include cookies in the request
        });
        console.log('Verification result:', result.data);
        if (result.data.Status) {
          setIsValid(true);
          setUserRole(result.data.role);
        } else {
          setIsValid(false);
          setRedirectPath('/'); // Redirect to login if not valid
        }
      } catch (err) {
        console.error('Verification error:', err);
        setIsValid(false);
        setRedirectPath('/'); // Redirect to login on error
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  if (loading) {
    // Show a loading spinner or message here
    return <div>Loading...</div>;
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
