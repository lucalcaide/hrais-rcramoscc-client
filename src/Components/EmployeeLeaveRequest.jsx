import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";

const EmployeeLeaveRequest = () => {
  const [employee, setEmployee] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  useEffect(() => {
    axios.get(`http://localhost:3000/employee/home/${id}`)
      .then(result => {
        setEmployee(result.data[0]);
        setName(result.data[0].fname + ' ' + result.data[0].lname);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the start date is after the end date
    if (new Date(startDate) > new Date(endDate)) {
      setErrorMessage('The start date must be on or before the end date.');
      setSuccessMessage(''); // Clear success message if any
      return; // Prevent the form submission
    }

    const leaveData = {
      emp_id: id,
      name: name,
      start_date: startDate,
      end_date: endDate,
      reason: reason,
      status: "pending"
    };

    // Clear error message on successful validation
    setErrorMessage('');

    axios.post('http://localhost:3000/employee/leave', leaveData)
      .then(response => {
        setSuccessMessage('Leave request submitted successfully.');
        setErrorMessage(''); // Clear error message if any
        setTimeout(() => navigate(`/employee_leave/${id}`), 2500); // Navigate after showing message
      })
      .catch(error => {
        console.error('There was an error submitting the leave request!', error);
        setErrorMessage('Failed to submit the leave request due to an error.');
        setSuccessMessage(''); // Clear success message if any
      });
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='card p-5 shadow-sm custom-shadow' style={{ maxWidth: '600px', width: '100%' }}>
        <h2 className='text-center mb-4' style={{ fontSize: '28px', fontWeight: 'bold', fontFamily: 'Montserrat', color: '#0b283b' }}>Leave Request</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="name" style={{ fontSize: '20px', fontFamily: 'Montserrat', color: '#0b283b', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Employee Name</label>
            <input
              id="name"
              type='text'
              className='form-control'
              value={name}
              readOnly
              required
              style={{ fontSize: '22px', fontFamily: 'Montserrat' }}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor="start_date" style={{ fontSize: '20px', fontFamily: 'Montserrat', color: '#0b283b', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Start Date</label>
            <input
              id="start_date"
              type='date'
              className='form-control'
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              style={{ fontSize: '22px', fontFamily: 'Montserrat' }}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor="end_date" style={{ fontSize: '20px', fontFamily: 'Montserrat', color: '#0b283b', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>End Date</label>
            <input
              id="end_date"
              type='date'
              className='form-control'
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              style={{ fontSize: '22px', fontFamily: 'Montserrat' }}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor="reason" style={{ fontSize: '20px', fontFamily: 'Montserrat', color: '#0b283b', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Reason for Leave</label>
            <select
              id="reason"
              className='form-control'
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              style={{ fontSize: '22px', fontFamily: 'Montserrat' }}
            >
              <option value="">Select Reason</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Vacation Leave">Vacation Leave</option>
              <option value="Annual Leave">Annual Leave</option>
              <option value="Maternity Leave">Maternity Leave</option>
              <option value="Paternity Leave">Paternity Leave</option>
              <option value="Parental Leave">Parental Leave</option>
              <option value="Personal Leave">Personal Leave</option>
              <option value="Study Leave">Study Leave</option>
            </select>
          </div>
          
          {errorMessage && <div className="alert alert-danger" role="alert" style={{ fontFamily: 'Montserrat', fontWeight: 'bold' }}>{errorMessage}</div>}
          {successMessage && <div className="alert alert-success" role="alert" style={{ fontFamily: 'Montserrat', fontWeight: 'bold' }}>{successMessage}</div>}

          <button className='btn btn-primary w-100' style={{ fontSize: '22px', fontFamily: 'Montserrat', backgroundColor: '#0b283b', border: 'none' }}>Submit Leave</button>
          <div className='text-center mt-4'>
            <Link to={`/employee_leave/${id}`} className='btn btn-link' style={{ fontSize: '18px', fontFamily: 'Montserrat', color: '#0b283b', textDecoration: 'none' }}>
              Return to My Leave
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeLeaveRequest;
