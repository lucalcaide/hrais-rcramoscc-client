import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx';
import { UPDATE_ATTENDANCE_URL, UPDATE_ATTENDANCE_STATUS_URL } from '../api'; // Adjust the import path as needed

const PayrollAttendanceFullDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { record } = location.state || {};

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingLate, setIsEditingLate] = useState(false);
  const [isEditingExtra, setIsEditingExtra] = useState(false);
  const [isEditingStatus, setIsEditingStatus] = useState(false);

  const [editedHours, setEditedHours] = useState(record.hours_worked);
  const [editedLate, setEditedLate] = useState(record.late);
  const [editedExtra, setEditedExtra] = useState(record.extra);
  const [editedStatus, setEditedStatus] = useState(record.status);
  const [updatedRecord, setUpdatedRecord] = useState(record);

  useEffect(() => {
    // Ensure that updatedRecord is in sync with the initial record
    setUpdatedRecord(record);
  }, [record]);

  if (!record) {
    return (
      <div className="container mt-5">
        <h2 className="text-center">No record found</h2>
      </div>
    );
  }

  // Function to format time as '7:15 AM'
  const formatTime = (time) => {
    return new Date(`1970-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  // Function to handle edit button click for hours
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Function to handle edit button click for late
  const handleEditLateClick = () => {
    setIsEditingLate(true);
  };

  // Function to handle edit button click for extra
  const handleEditExtraClick = () => {
    setIsEditingExtra(true);
  };

  // Function to handle edit button click for status
  const handleEditStatusClick = () => {
    setIsEditingStatus(true);
  };

  // Function to handle form submission for hours
  const handleSaveClick = async () => {
    try {
      const response = await axios.post(UPDATE_ATTENDANCE_URL(record.id), {
        hours_worked: editedHours,
        late: editedLate,
        extra: editedExtra,
      });

      if (response.data.Status) {
        toast.success('Record updated successfully');
        setUpdatedRecord(response.data.Result);
        setIsEditing(false);
        setIsEditingLate(false);
        setIsEditingExtra(false);
      } else {
        toast.error('Error updating record');
      }
    } catch (error) {
      console.error('Error updating record:', error);
      toast.error('Error updating record');
    }
  };

  // Function to handle form submission for status
  const handleStatusSaveClick = async () => {
    try {
      const response = await axios.post(UPDATE_ATTENDANCE_STATUS_URL(record.id), {
        status: editedStatus,
      });

      if (response.data.Status) {
        toast.success('Status updated successfully');
        setUpdatedRecord(response.data.Result);
        setIsEditingStatus(false);
      } else {
        toast.error('Error updating status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Error updating status');
    }
  };

  // Function to handle cancel button click for hours
  const handleCancelClick = () => {
    setEditedHours(updatedRecord.hours_worked);
    setIsEditing(false);
  };

  // Function to handle cancel button click for late
  const handleLateCancelClick = () => {
    setEditedLate(updatedRecord.late);
    setIsEditingLate(false);
  };

  // Function to handle cancel button click for extra
  const handleExtraCancelClick = () => {
    setEditedExtra(updatedRecord.extra);
    setIsEditingExtra(false);
  };

  // Function to handle cancel button click for status
  const handleStatusCancelClick = () => {
    setEditedStatus(updatedRecord.status);
    setIsEditingStatus(false);
  };

  const handlePrint = () => {
    const printContents = document.getElementById('attendance-details').innerHTML;
    const originalContents = document.body.innerHTML;

    // Hide edit buttons
    const editButtons = document.querySelectorAll('.btn-secondary');
    editButtons.forEach(button => button.style.display = 'none');

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  const handleExportToExcel = () => {
    const attendanceData = [
      [ 'Employee', 'Date', 'Time In', 'Time Out', 'Status', 'Rate Per Hour', 'Rate Per Minute', 'Hours Worked', 'Late', 'Extra', 'Earnings', 'Tardiness', 'Overtime', 'Total Amount to Pay'],
      [ updatedRecord.emp_no, new Date(updatedRecord.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }), formatTime(updatedRecord.time_in), formatTime(updatedRecord.time_out), updatedRecord.status, `₱${updatedRecord.rate_per_hour}`, `₱${updatedRecord.rate_per_minute}`, `${updatedRecord.hours_worked} hours`, `${updatedRecord.late} minutes`, `${updatedRecord.extra} minutes`, `₱${updatedRecord.earnings}`, `- ₱${updatedRecord.tardiness}`, `+ ₱${updatedRecord.overtime}`, `₱${updatedRecord.total_amount_pay}`]
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(attendanceData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Attendance Details');
    XLSX.writeFile(wb, `${updatedRecord.emp_no}_${new Date(updatedRecord.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}_attendance_details.xlsx`);
  };

  return (
    <div className="container mt-3" style={{ fontFamily: 'Montserrat' }}>
      <ToastContainer 
        position="top-center" 
        style={{ 
          fontSize: '20px', 
          width: '500px', 
          padding: '20px', 
          borderRadius: '10px', }}/>
          
      <div className='d-flex justify-content-center mb-4'>
        <span className="header-title" style={{ fontSize: '35px' }}>ATTENDANCE FULL DETAILS</span>
      </div>
      <button className="btn btn-back-color rounded-pill" style={{ marginRight: '10px' }} onClick={() => navigate(-1)}>
        <i className="bi bi-arrow-left-circle"></i>
      </button>

      <button className="btn btn-back-color rounded-pill" style={{ marginRight: '10px' }} onClick={handlePrint}>
        <i className="bi bi-printer"></i>
      </button>

      <button className="btn btn-back-color rounded-pill" style={{ marginRight: '10px' }} onClick={handleExportToExcel}>
        <i className="bi bi-file-earmark-excel"></i>
      </button>
      
      <div id="attendance-details" className="card shadow-sm mt-3">
        <div className="card-body">
          <div className="text-center mb-4">
            <h5 className="card-title" style={{ fontSize: '30px', fontWeight:'bold' }}>Employee ID: {updatedRecord.emp_no}</h5>
            <p className="card-title" style={{ fontSize: '26px' }}>Attendance ID: {updatedRecord.id}</p>
          </div>
          <table className="table table-bordered" style={{ borderRadius: '15px', overflow: 'hidden' }}>
            <thead>
              <tr>
                <th colSpan="2" style={{ fontSize: '25px', padding: '15px', textAlign: 'center', backgroundColor: '#0b283b', color: 'wheat' }}>Attendance Full Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontSize: '22px', padding: '10px', width: '200px' }}>Date</td>
                <td style={{ fontSize: '24px', padding: '10px' }}>{new Date(updatedRecord.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
              </tr>
              <tr>
                <td style={{ fontSize: '22px', padding: '10px' }}>Time In</td>
                <td style={{ fontSize: '24px', padding: '10px' }}>{formatTime(updatedRecord.time_in)}</td>
              </tr>
              <tr>
                <td style={{ fontSize: '22px', padding: '10px' }}>Time Out</td>
                <td style={{ fontSize: '24px', padding: '10px' }}>{formatTime(updatedRecord.time_out)}</td>
              </tr>
              <tr>
                <td style={{ fontSize: '22px', padding: '10px' }}>Status</td>
                <td style={{ fontSize: '24px', padding: '10px' }}>
                  {isEditingStatus ? (
                    <>
                      <input
                        type="text"
                        value={editedStatus}
                        onChange={(e) => setEditedStatus(e.target.value)}
                      />
                      <button className="btn btn-success ms-2" onClick={handleStatusSaveClick}>Save</button>
                      <button className="btn btn-secondary ms-2" onClick={handleStatusCancelClick}>Cancel</button>
                    </>
                  ) : (
                    <>
                      {updatedRecord.status}
                      <button className="btn btn-warning ms-2" onClick={handleEditStatusClick}>Edit</button>
                    </>
                  )}
                </td>
              </tr>
              <tr>
                <td style={{ fontSize: '22px', padding: '10px' }}>Rate Per Hour</td>
                <td style={{ fontSize: '24px', padding: '10px' }}>{`₱${updatedRecord.rate_per_hour}`}</td>
              </tr>
              <tr>
                <td style={{ fontSize: '22px', padding: '10px' }}>Rate Per Minute</td>
                <td style={{ fontSize: '24px', padding: '10px' }}>{`₱${updatedRecord.rate_per_minute}`}</td>
              </tr>
              <tr>
                <td style={{ fontSize: '22px', padding: '10px' }}>Hours Worked</td>
                <td style={{ fontSize: '24px', padding: '10px' }}>
                  {isEditing ? (
                    <>
                      <input
                        type="number"
                        value={editedHours}
                        onChange={(e) => setEditedHours(e.target.value)}
                      />
                      <button className="btn btn-success ms-2" onClick={handleSaveClick}>Save</button>
                      <button className="btn btn-secondary ms-2" onClick={handleCancelClick}>Cancel</button>
                    </>
                  ) : (
                    <>
                      {updatedRecord.hours_worked}
                      <button className="btn btn-warning ms-2" onClick={handleEditClick}>Edit</button>
                    </>
                  )}
                </td>
              </tr>
              <tr>
                <td style={{ fontSize: '22px', padding: '10px' }}>Late</td>
                <td style={{ fontSize: '24px', padding: '10px' }}>
                  {isEditingLate ? (
                    <>
                      <input
                        type="number"
                        value={editedLate}
                        onChange={(e) => setEditedLate(e.target.value)}
                      />
                      <button className="btn btn-success ms-2" onClick={handleLateSaveClick}>Save</button>
                      <button className="btn btn-secondary ms-2" onClick={handleLateCancelClick}>Cancel</button>
                    </>
                  ) : (
                    <>
                      {updatedRecord.late}
                      <button className="btn btn-warning ms-2" onClick={handleEditLateClick}>Edit</button>
                    </>
                  )}
                </td>
              </tr>
              <tr>
                <td style={{ fontSize: '22px', padding: '10px' }}>Extra</td>
                <td style={{ fontSize: '24px', padding: '10px' }}>
                  {isEditingExtra ? (
                    <>
                      <input
                        type="number"
                        value={editedExtra}
                        onChange={(e) => setEditedExtra(e.target.value)}
                      />
                      <button className="btn btn-success ms-2" onClick={handleExtraSaveClick}>Save</button>
                      <button className="btn btn-secondary ms-2" onClick={handleExtraCancelClick}>Cancel</button>
                    </>
                  ) : (
                    <>
                      {updatedRecord.extra}
                      <button className="btn btn-warning ms-2" onClick={handleEditExtraClick}>Edit</button>
                    </>
                  )}
                </td>
              </tr>
              <tr>
                <td style={{ fontSize: '22px', padding: '10px' }}>Earnings</td>
                <td style={{ fontSize: '24px', padding: '10px' }}>{`₱${updatedRecord.earnings}`}</td>
              </tr>
              <tr>
                <td style={{ fontSize: '22px', padding: '10px' }}>Tardiness</td>
                <td style={{ fontSize: '24px', padding: '10px' }}>{`- ₱${updatedRecord.tardiness}`}</td>
              </tr>
              <tr>
                <td style={{ fontSize: '22px', padding: '10px' }}>Overtime</td>
                <td style={{ fontSize: '24px', padding: '10px' }}>{`+ ₱${updatedRecord.overtime}`}</td>
              </tr>
              <tr>
                <td style={{ fontSize: '22px', padding: '10px' }}>Total Amount to Pay</td>
                <td style={{ fontSize: '24px', padding: '10px' }}>{`₱${updatedRecord.total_amount_pay}`}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PayrollAttendanceFullDetails;
