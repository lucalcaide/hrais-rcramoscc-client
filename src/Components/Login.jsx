import React, { useState, useEffect } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { Snackbar, SnackbarContent, Button } from '@mui/material';
import { login, verifySession } from './api';  // Import the API functions

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    verifySession()
      .then(result => {
        if (result.data.Status) {
          handleRoleRedirection(result.data.role, result.data.id);
        }
      })
      .catch(err => {
        console.error('Verification error:', err); // Debug log
      });
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    login(values)
      .then(result => {
        if (result.data.loginStatus) {
          localStorage.setItem('valid', true);
          localStorage.setItem('token', result.data.token); // Assuming you receive a token
          handleRoleRedirection(result.data.role, result.data.id);
        } else {
          setError(result.data.Error || 'Invalid credentials. Please try again.');
        }
      })
      .catch(err => {
        setError('An error occurred. Please try again later.');
        console.log(err);
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
            <button className='btn btn-link' style={{ fontSize: '18px', fontFamily: 'Montserrat', color: 'black' }} onClick={handleForgotPassword}>Forgot your password?</button>
            <hr className="my-4" />
            <a href='https://www.linkedin.com/company/rc-ramos-construction-corp' target='_blank' rel='noopener noreferrer'>
              <i className="bi bi-linkedin" style={{ fontSize: '30px', color: '#0A66C2' }}></i>
            </a>
          </div>
        </div>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <SnackbarContent
          style={{ backgroundColor: 'orange' }}
          message={
            <span>
              Forgot your password? Please contact the admin to reset your password.
            </span>
          }
          action={
            <Button color="inherit" onClick={handleSnackbarClose}>
              Close
            </Button>
          }
        />
      </Snackbar>
    </div>
  );
};

export default Login;
