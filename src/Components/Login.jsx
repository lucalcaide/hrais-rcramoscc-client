import React, { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Snackbar, SnackbarContent, Button } from '@mui/material';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();
  
  // Ensure cookies are included with all Axios requests
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    if (token) {
      axios.get('https://hrais-rcramoscc-server.onrender.com/verify', {
        headers: { 'Authorization': `Bearer ${token}` },
        withCredentials: true
      })
      .then(result => {
        if (result.data.Status) {
          handleRoleRedirection(result.data.role, result.data.id);
        }
      })
      .catch(err => {
        console.error('Verification error:', err);
      });
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://hrais-rcramoscc-server.onrender.com/auth/login', values)
      .then(result => {
        if (result.data.loginStatus) {
          // Store token in cookie
          document.cookie = `token=${result.data.token}; path=/; secure; samesite=strict`;
          handleRoleRedirection(result.data.role, result.data.id);
        } else {
          setError(result.data.Error || 'Invalid credentials. Please try again.');
        }
      })
      .catch(err => {
        setError('An error occurred. Please try again later.');
      });
  };
  

  const handleRoleRedirection = (role, id) => {
    switch(role) {
      case 'admin':
        navigate('/dashboard');
        break;
      case 'recruitment':
        navigate('/recruitmentdashboard');
        break;
      case 'payroll':
        navigate('/payrolldashboard');
        break;
      case 'employee':
        navigate(`/employee_home/${id}`);
        break;
      default:
        setError('Invalid role. Please contact support.');
    }
  };

  const handleForgotPassword = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div className='login-page'>
      <div className='d-flex justify-content-center align-items-center vh-100'>
        <div className='p-5 rounded w-30' style={{ boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.3)' }}>
          <div className='text-center'>
            <h1 className="display-4 mb-4" style={{ fontSize: '45px', fontWeight: 'bold', fontFamily: 'Montserrat' }}>Welcome to</h1>
            <img src={"/Images/r.c. logo nobg.png"} alt="Company Logo" className="mb-4 mx-auto d-block" style={{ width: '90px' }} />
            <span style={{ fontSize: '30px', fontFamily: 'Montserrat' }}>R.C. RAMOS CONSTRUCTION CORPORATION</span>
            <p style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'Montserrat', marginTop:'20px' }}>Please login to continue.</p>
            <hr className="my-4" />
          </div>
          <form className="d-flex flex-column align-items-center" onSubmit={handleSubmit}>
            {error && (
              <div style={{ width: '400px' }}>
                <div className='alert alert-danger' role='alert' style={{ fontFamily: 'Montserrat', fontWeight: 'bold' }}>
                  {error}
                </div>
              </div>
            )}
            <div className='mb-2' style={{ width: '400px' }}>
              <div className="input-group modern-input">
                <span className="input-group-text">
                  <i className="bi bi-envelope" style={{ fontSize: '30px' }}></i>
                </span>
                <input
                  style={{ fontSize: '20px', fontFamily: 'Montserrat' }}
                  type='email'
                  name='email'
                  placeholder='Email'
                  autoComplete='off'
                  onChange={(e) => setValues({ ...values, email: e.target.value })}
                  className='form-control'
                />
              </div>
            </div>
            <div className='mb-1' style={{ width: '400px' }}>
              <div className="input-group modern-input">
                <span className="input-group-text">
                  <i className="bi bi-lock" style={{ fontSize: '30px' }}></i>
                </span>
                <input
                  style={{ fontSize: '20px', fontFamily: 'Montserrat' }}
                  type='password'
                  name='password'
                  placeholder='Password'
                  onChange={(e) => setValues({ ...values, password: e.target.value })}
                  className='form-control'
                />
              </div>
            </div>
            <button className='btn btn-success w-50 rounded-2 mb-2' style={{ fontSize: '18px', fontFamily: 'Montserrat', marginTop:'20px' }}>Login</button>
          </form>

          <div className='text-center'>
            <button className='btn btn-link' style={{ fontSize: '18px', fontFamily: 'Montserrat', color: 'black' }} onClick={handleForgotPassword}>
              Forgot Password?
            </button>
          </div>
          <div className='text-center' style={{ marginTop: '50px' }}>
            <span style={{ fontSize: '18px', fontFamily: 'Montserrat', marginRight: '10px' }}>visit us on</span>
            <a href="https://www.facebook.com/rc.ramos.2020" target="_blank" rel="noopener noreferrer" className='mx-2'>
              <i className="bi bi-facebook" style={{ fontSize: '30px', color: '#4267B2' }}></i>
            </a>

            <a href="https://www.instagram.com/rc_ramoscorp?igsh=ZnY2NHM0M2c1cjd2" target="_blank" rel="noopener noreferrer" className='mx-2'>
              <i className="bi bi-instagram" style={{ fontSize: '30px', color: '#0A66C2' }}></i>
            </a>

            <a href="https://www.linkedin.com/company/r-c-ramos-construction-corporation/" target="_blank" rel="noopener noreferrer" className='mx-2'>
              <i className="bi bi-linkedin" style={{ fontSize: '30px', color: '#0A66C2' }}></i>
            </a>
            
          </div>
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <SnackbarContent
          message={
            <span style={{ display: 'flex', alignItems: 'center' }}>
              Please contact HR for further assistance.
              <Button color="inherit" size="small" onClick={handleSnackbarClose} style={{ fontSize: '16px', fontWeight: 'bold', color: '#ff8800' }}>
                OKAY
              </Button>
            </span>
          }
          className='rounded-4'
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white', padding: '16px', fontSize: '18px' }}
        />
      </Snackbar>
    </div>
  );
};

export default Login;
