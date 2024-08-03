// src/api.js

import axios from 'axios';

const BASE_URL = 'https://hrais-rcramoscc-server.onrender.com';

// Fetch employee data by ID
export const fetchEmployeeData = (id) => {
  return axios.get(`${BASE_URL}/employee/home/${id}`);
};

// Fetch attendance data by employee number
export const fetchAttendanceData = (empNo) => {
  return axios.get(`${BASE_URL}/employee/attendance/${empNo}`);
};

// Fetch leave data by ID
export const fetchLeaveData = (id) => {
  return axios.get(`${BASE_URL}/employee/leave/${id}`);
};

// Determine which logout route to use based on user context
export const logout = (context) => {
    switch(context) {
      case 'admin':
        return axios.get(`${BASE_URL}/auth/logout`);
      case 'employee':
        return axios.get(`${BASE_URL}/employee/logout`);
      case 'recruitment':
        return axios.get(`${BASE_URL}/recruitment/logout`);
      case 'payroll':
        return axios.get(`${BASE_URL}/payroll/logout`);
      default:
        return axios.get(`${BASE_URL}/auth/logout`); // default to auth if context is unknown
    }
  };

// Fetch protected data with authorization
export const fetchProtectedData = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${BASE_URL}/protected-route`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, e.g., redirect to login
      throw new Error('Unauthorized');
    } else {
      throw error;
    }
  }
};