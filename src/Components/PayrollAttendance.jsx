import React, { useState, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';

const PayrollAttendance = () => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null); // Create a reference for the file input

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.warning('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('attendance_file', file);

    try {
      const response = await axios.post('https://hrais-rcramoscc-server.onrender.com/auth/upload-attendance', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success(response.data.message);
      setFile(null); // Clear the file state
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Clear the file input field
      }
    } catch (error) {
      console.error('Error uploading file:', error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || 'Failed to upload file.');
    }
  };

  // Inline styles
  const containerStyle = {
    padding: '30px',
    margin: '20px auto',
    maxWidth: '800px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Increased shadow to make it more visible
    fontFamily: 'Montserrat, sans-serif', // Changed font family to Montserrat
  };

  const titleStyle = {
    fontSize: '28px',
    color: '#333',
    marginBottom: '10px',
  };

  const descriptionStyle = {
    fontSize: '20px',
    color: 'gray',
    marginBottom: '15px',
  };

  const instructionsStyle = {
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '4px',
  };

  const instructionItemStyle = {
    fontSize: '20px',
    color: '#444',
    marginBottom: '8px',
  };

  const noteStyle = {
    fontSize: '20px',
    color: 'black', // Set the color to black
    fontStyle: 'italic', // Make the note italic
    marginBottom: '20px',
  };

  const fileInputStyle = {
    fontSize: '16px',
    padding: '10px',
    width: '100%',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '20px',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '10px', // Added gap between buttons
  };

  const buttonStyle = {
    fontSize: '16px',
    padding: '12px 20px',
    backgroundColor: '#0b283b',
    color: 'wheat',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'background-color 0.3s',
  };

  const buttonIconStyle = {
    marginRight: '8px',
  };

  const buttonHoverStyle = {
    backgroundColor: 'gray',
  };

  const linkContainerStyle = {
    marginBottom: '20px',
    textAlign: 'center', // Center the link container
  };

  const linkStyle = {
    fontSize: '23px',
    padding: '10px 30px', // Adjust padding to maintain pill shape
    backgroundColor: '#0b283b',
    color: 'wheat',
    border: 'none',
    borderRadius: '50px', // Make the link rounded-pill
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // Center the icon and text horizontally
    transition: 'background-color 0.3s',
    cursor: 'pointer',
    margin: '0 auto', // Center the link within its container
  };

  const linkHoverStyle = {
    backgroundColor: 'gray',
  };

  return (
    <div style={containerStyle}>

      <div>
        <h2 style={titleStyle}>Upload Attendance File</h2>
        <p style={descriptionStyle}>
          Please upload a CSV file containing the attendance data. Ensure the file follows the format below:
        </p>
        <div style={instructionsStyle}>
          <div style={instructionItemStyle}><strong>Column 1:</strong> emp_no</div>
          <div style={instructionItemStyle}><strong>Column 2:</strong> date</div>
          <div style={instructionItemStyle}><strong>Column 3:</strong> time_in</div>
          <div style={instructionItemStyle}><strong>Column 4:</strong> time_out</div>
        </div>
        <p style={noteStyle}>
          Note: Make sure the CSV file follows the format outlined above to ensure proper processing.
        </p>
        <input
          type="file"
          onChange={handleFileChange}
          accept=".csv"
          ref={fileInputRef} // Attach the reference to the input
          style={fileInputStyle} // Apply inline styles
        />
      </div>

      <div style={buttonContainerStyle}>
        <button
          style={buttonStyle}
          onClick={handleUpload}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
        >
          <i className="bi bi-upload" style={buttonIconStyle}></i>
          Upload Attendance
        </button>
      </div>

      <div style={linkContainerStyle} className='mt-5'>
        <Link
          to="/dashboard/manage_attendance"
          style={linkStyle}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = linkStyle.backgroundColor}
        >
          <i className="bi bi-list" style={buttonIconStyle}></i>
          Manage Attendance
        </Link>
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

export default PayrollAttendance;
