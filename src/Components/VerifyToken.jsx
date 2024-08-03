import React, { useEffect } from 'react';
import axios from 'axios';

const VerifyToken = () => {
  useEffect(() => {
    const token = localStorage.getItem('token'); // Assuming you store the token in localStorage

    axios.get('https://hrais-rcramoscc-server.onrender.com/verify', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('Verification successful:', response.data);
      // Handle successful verification, e.g., set user state, redirect, etc.
    })
    .catch(error => {
      console.error('Verification failed:', error);
      // Handle verification failure, e.g., redirect to login, show error message, etc.
    });
  }, []); // Empty dependency array means this effect runs once on mount

  return null; // This component does not render anything
};

export default VerifyToken;