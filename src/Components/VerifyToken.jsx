import React, { useEffect } from 'react';
import axios from 'axios';

const VerifyToken = () => {
  useEffect(() => {
    const token = localStorage.getItem('token'); // Get the token from localStorage

    axios.get('https://hrais-rcramoscc-server.onrender.com/verify', {
      headers: { 'Authorization': `Bearer ${token}` }, withCredentials: true
    })
    .then(response => {
      console.log('Token verification response:', response.data);
    })
    .catch(error => {
      console.error('Token verification failed:', error);
    });
  }, []);

  return null;
};

export default VerifyToken;
