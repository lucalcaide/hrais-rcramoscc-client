import React, { useEffect } from 'react';
import axios from 'axios';

const VerifyToken = () => {
  useEffect(() => {
    const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
    console.log('Stored token:', token);

    axios.get('https://hrais-rcramoscc-server.onrender.com/verify', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('Token verification response:', response.data);
    })
    .catch(error => {
      console.error('Token verification failed:', error);
    });
  }, []); // Empty dependency array means this effect runs once on mount

  return null; // This component does not render anything
};

export default VerifyToken;