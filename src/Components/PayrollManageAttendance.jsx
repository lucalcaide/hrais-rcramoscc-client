import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const PayrollManageAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [status, setStatus] = useState('');
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(20);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth/get-attendance-records');
        if (response.data.Status) {
          setAttendanceRecords(response.data.Result);
          setFilteredRecords(response.data.Result);
          setTotalRecords(response.data.Result.length);
        } else {
          toast.error(response.data.Error);
        }
      } catch (error) {
        console.error('Error fetching attendance records:', error);
        toast.error('Failed to fetch attendance records.');
      }
    };

    fetchAttendanceRecords();
  }, []);

  useEffect(() => {
    handleStatusFilter(status);
  }, [attendanceRecords]);

  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleFullDetails = (record) => {
    navigate('/dashboard/attendance-fulldetails', { state: { record } });
  };

  const handleDelete = async (recordId) => {
    if (window.confirm('Are you sure you want to delete this attendance record?')) {
      try {
        const response = await axios.delete(`http://localhost:3000/auth/delete-attendance-record/${recordId}`);
        if (response.data.Status) {
          toast.success('Record deleted successfully');
          const updatedRecords = attendanceRecords.filter(record => record.id !== recordId);
          setAttendanceRecords(updatedRecords);
          setFilteredRecords(updatedRecords);
          setTotalRecords(updatedRecords.length);
        } else {
          toast.error(response.data.Error);
        }
      } catch (error) {
        console.error('Error deleting attendance record:', error);
        toast.error('Failed to delete attendance record.');
      }
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return <span className="badge bg-warning text-dark">{status}</span>;
      case 'Fulfilled':
        return <span className="badge bg-success">{status}</span>;
      case 'Rejected':
        return <span className="badge bg-danger">{status}</span>;
      default:
        return <span>{status}</span>;
    }
  };

  const handleDateFilter = () => {
    const from = new Date(fromDate);
    from.setHours(0, 0, 0, 0);
    const to = new Date(toDate);
    to.setHours(23, 59, 59, 999);

    const filtered = attendanceRecords.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate >= from && recordDate <= to;
    });

    setFilteredRecords(filtered);
    setTotalRecords(filtered.length);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleStatusFilter = (selectedStatus) => {
    setStatus(selectedStatus);
    const filtered = attendanceRecords.filter(record => {
      return selectedStatus ? record.status === selectedStatus : true;
    });

    setFilteredRecords(filtered);
    setTotalRecords(filtered.length);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    const filtered = attendanceRecords.filter(record => record.emp_no.toLowerCase().includes(event.target.value.toLowerCase()));
    setFilteredRecords(filtered);
    setTotalRecords(filtered.length);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Pagination calculations
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalRecords / recordsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className="container mt-3" style={{ fontFamily: 'Montserrat' }}>
        <div className='d-flex justify-content-center mb-2 print-hide'>
          <span style={{ fontSize: '35px' }}>MANAGE ATTENDANCE</span>
        </div>

        <div className="input-group mt-3 print-hide">
          <span className="input-group-text" id="search-addon" style={{ backgroundColor: '#0b283b' }}>
            <i style={{ color: 'wheat' }} className="bi bi-search"></i>
          </span>
          <input
            type="text"
            placeholder="Search Employee ID"
            className="form-control form-control-lg"
            value={searchQuery}
            onChange={handleSearch}
            style={{ fontSize: '22px', fontFamily: 'Montserrat' }}
          />
        </div>
        
        <div className="d-flex justify-content-center mb-3 mt-3">
          <div className="form-group me-2">
            <label htmlFor="fromDate">From</label>
            <input
              type="date"
              id="fromDate"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="form-control"
              style={{ maxWidth: '200px' }}
            />
          </div>
          <div className="form-group me-2">
            <label htmlFor="toDate">To</label>
            <input
              type="date"
              id="toDate"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="form-control"
              style={{ maxWidth: '200px' }}
            />
          </div>

          <div className="form-group">
            <button onClick={handleDateFilter} className="btn btn-secondary" style={{ marginTop: '30px' }}>Filter by Date</button>
          </div>

          <div className="form-group me-2 ms-5">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => handleStatusFilter(e.target.value)}
              className="form-control"
              style={{ maxWidth: '200px' }}
            >
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="Fulfilled">Fulfilled</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          
        </div>

        <div className="d-flex justify-content-center mb-3">
          <span style={{ fontSize: '20px', fontFamily:'Montserrat' }}>Total Records: {totalRecords}</span>
        </div>

        <div className="d-flex justify-content-center">
          <div className="col-md-12" style={{ padding: '20px', borderRadius: '10px' }}>
            {currentRecords.length > 0 ? (
              <table className="table table-striped" style={{ fontFamily: 'Montserrat', backgroundColor: 'transparent', width: '100%' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'center', fontSize:'20px' }}>Employee ID</th>
                    <th style={{ textAlign: 'center', fontSize:'20px' }}>Date</th>
                    <th style={{ textAlign: 'center', fontSize:'20px' }}>Time In</th>
                    <th style={{ textAlign: 'center', fontSize:'20px' }}>Time Out</th>
                    <th style={{ textAlign: 'center', fontSize:'20px' }}>Status</th>
                    <th style={{ textAlign: 'center', fontSize:'20px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.map((record) => (
                    <tr key={record.id}>
                      <td style={{ textAlign: 'center', fontSize:'18px' }}>{record.emp_no}</td>
                      <td style={{ textAlign: 'center', fontSize:'18px' }}>{formatDate(record.date)}</td>
                      <td style={{ textAlign: 'center', fontSize:'18px' }}>{formatTime(record.time_in)}</td>
                      <td style={{ textAlign: 'center', fontSize:'18px' }}>{formatTime(record.time_out)}</td>
                      <td style={{ textAlign: 'center', fontSize:'18px' }}>{getStatusBadge(record.status)}</td>
                      <td style={{ textAlign: 'center' }}>
                        <button
                          className="btn btn-info me-2"
                          onClick={() => handleFullDetails(record)}
                        >
                          <i className="bi bi-eye"></i>
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(record.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center">
                <p style={{fontSize:'30px', fontWeight:'bold'}}>No records found.</p>
              </div>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-center mb-3 print-hide">
          <nav>
            <ul className="pagination">
              {pageNumbers.map(number => (
                <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                  <a href="#!" className="page-link" onClick={() => paginate(number)}>
                    {number}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PayrollManageAttendance;
