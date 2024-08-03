import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddDept = () => {
  const [department, setDepartment] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://hrais-rcramoscc-server.onrender.com/auth/add_dept', { department })
      .then(result => {
        if (result.data.Status) {
          toast.success(`Department '${department}' added successfully!`);
          setDepartment(''); // Clear the department state after successful submission
        } else {
          toast.error(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  const handleReset = () => {
    setDepartment(''); // Reset the department state
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100' >
      <div className='card p-5 shadow-sm custom-shadow' style={{ maxWidth: '700px', width: '100%', marginBottom:'300px'}}>
        <div className="text-center mb-4">
          <h2 className='mt-3 mb-3' style={{ fontSize: '28px', fontWeight: 'bold', fontFamily: 'Montserrat', color: '#0b283b' }}>Add Department</h2>
          <p style={{ fontSize: '20px', fontFamily: 'Montserrat', color: '#666' }}>
            Enter the name of the new <span style={{ fontWeight: 'bold' }}>department</span> below.
          </p>
        </div>

        <form onSubmit={handleSubmit} onReset={handleReset}>
          <div className='mb-3'>
            <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="bi bi-building" style={{ fontSize: '22px', color: '#0b283b' }}></i>
              </span>
              <input
                style={{ fontSize: '22px', fontFamily: 'Montserrat' }}
                type='text'
                name='department'
                placeholder='Department'
                autoComplete='off'
                value={department} // Bind the input value to the department state
                onChange={(e) => setDepartment(e.target.value)}
                className='form-control'
                required
              />
            </div>
          </div>
          <button className='btn btn-primary w-100 mb-3' style={{ fontSize: '22px', fontFamily: 'Montserrat', backgroundColor: '#0b283b', border: 'none' }}>Add Department</button>
          <button type="reset" className='btn btn-outline-secondary w-100' style={{ fontSize: '22px', fontFamily: 'Montserrat' }}>Reset</button>
        </form>
        <div className='text-center mt-3'>
          <button onClick={() => navigate('/dashboard/department')} className='btn btn-link' style={{ fontSize: '22px', fontFamily: 'Montserrat', color: '#0b283b', textDecoration: 'none' }}>
            Return to Department list
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        style={{
          fontSize: '20px',
          width: '500px', // Adjust width as needed
          padding: '20px', // Adjust padding as needed
          borderRadius: '10px', // Adjust border radius as needed
        }}
      />
    </div>
  );
};

export default AddDept;
