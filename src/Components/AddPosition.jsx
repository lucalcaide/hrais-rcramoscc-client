import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddPosition = () => {
  const [position, setPosition] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://hrais-rcramoscc-server.onrender.com/auth/add_position', { position })
      .then(result => {
        if (result.data.Status) {
          toast.success(`Position '${position}' added successfully!`);
          setPosition(''); // Clear the position state after successful submission
        } else {
          toast.error(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  const handleReset = () => {
    setPosition(''); // Reset the position state
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100' >
      <div className='card p-5 shadow-sm custom-shadow' style={{ maxWidth: '700px', width: '100%', marginBottom:'300px' }}>
        <div className="text-center mb-4">
          <h2 className='mt-3 mb-3' style={{ fontSize: '28px', fontWeight: 'bold', fontFamily: 'Montserrat', color: '#0b283b' }}>Add Position</h2>
          <p style={{ fontSize: '20px', fontFamily: 'Montserrat', color: '#666' }}>
            Enter the name of the new <span style={{ fontWeight: 'bold' }}>position</span> below.
          </p>
        </div>

        <form onSubmit={handleSubmit} onReset={handleReset}>
          <div className='mb-3'>
            <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="bi bi-tags" style={{ fontSize: '22px', color: '#0b283b' }}></i>
              </span>
              <input
                style={{ fontSize: '22px', fontFamily: 'Montserrat' }}
                type='text'
                name='position'
                placeholder='Position'
                autoComplete='off'
                value={position} // Bind the input value to the position state
                onChange={(e) => setPosition(e.target.value)}
                className='form-control'
                required
              />
            </div>
          </div>
          <button className='btn btn-primary w-100 mb-3' style={{ fontSize: '22px', fontFamily: 'Montserrat', backgroundColor: '#0b283b', border: 'none' }}>Add Position</button>
          <button type="reset" className='btn btn-outline-secondary w-100' style={{ fontSize: '22px', fontFamily: 'Montserrat' }}>Reset</button>
        </form>
        <div className='text-center mt-3'>
          <button onClick={() => navigate('/dashboard/position')} className='btn btn-link' style={{ fontSize: '22px', fontFamily: 'Montserrat', color: '#0b283b', textDecoration: 'none' }}>
            Return to Position list
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

export default AddPosition;
