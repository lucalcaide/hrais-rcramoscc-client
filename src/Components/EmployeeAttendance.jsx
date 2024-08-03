import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap-icons/font/bootstrap-icons.css";

const EmployeeAttendance = () => {
  const [employee, setEmployee] = useState({});
  const [attendance, setAttendance] = useState([]);
  const [totalAttendanceRecords, setTotalAttendanceRecords] = useState(0); // New state for total attendance records
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const attendancePerPage = 10;
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios.get(`https://hrais-rcramoscc-server.onrender.com/employee/home/${id}`)
      .then(result => {
        setEmployee(result.data[0]);
        return result.data[0].emp_no;
      })
      .then(empNo => {
        return axios.get(`https://hrais-rcramoscc-server.onrender.com/employee/attendance/${empNo}`);
      })
      .then(result => {
        if (result.data.Status) {
          setAttendance(result.data.Result);
          setTotalAttendanceRecords(result.data.Result.length); // Set total attendance records
        } else {
          toast.error(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleLogout = () => {
    axios.get('https://hrais-rcramoscc-server.onrender.com/employee/logout')
      .then(result => {
        if (result.data.Status) {
          localStorage.removeItem("valid");
          navigate('/');
        }
      }).catch(err => console.log(err));
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const getLinkStyle = (path) => {
    return location.pathname === path
      ? {
          color: 'white',
          fontWeight: 'bold',
          borderBottom: '3px solid #ff8800',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }
      : {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        };
  };

  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'badge bg-warning text-dark'; // Yellow
      case 'fulfilled':
        return 'badge bg-success'; // Green
      case 'rejected':
        return 'badge bg-danger'; // Red
      default:
        return 'badge bg-secondary'; // Default color
    }
  };

  const handleDateFilter = () => {
    const from = new Date(fromDate);
    from.setHours(0, 0, 0, 0);
    const to = new Date(toDate);
    to.setHours(23, 59, 59, 999);

    const filtered = attendance.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate >= from && recordDate <= to;
    });

    setFilteredRecords(filtered);
    setTotalRecords(filtered.length);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleDateChange = () => {
    setCurrentPage(1);
  };

  const handleResetFilter = () => {
    setFromDate('');
    setToDate('');
    setStatusFilter('');
    setCurrentPage(1);
  };

  const filteredAttendance = attendance.filter(record => {
    const recordDate = new Date(record.date);
    const start = fromDate ? new Date(fromDate) : null;
    const end = toDate ? new Date(toDate) : null;
    return (!start || recordDate >= start) && (!end || recordDate <= end) &&
           (!statusFilter || record.status === statusFilter);
  });

  const totalRecords = filteredAttendance.length;
  const indexOfLastRecord = currentPage * attendancePerPage;
  const indexOfFirstRecord = indexOfLastRecord - attendancePerPage;
  const currentAttendance = showAll ? filteredAttendance : filteredAttendance.slice(indexOfFirstRecord, indexOfLastRecord);

  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(totalRecords / attendancePerPage)));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const handleFullDetailsClick = (record) => {
    if (employee && employee.id) {
      navigate(`/employee_attendance-fulldetails/${id}`, { state: { record } });
    } else {
      toast.error("Employee ID not available");
    }
  }; 
  
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="p-3 navbar navbar-expand-lg navbar-dark empprofile" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
        <div className="d-flex align-items-center">
          <img
            src="/Images/r.c. logo.jpeg"
            className="logo-size rounded-circle me-3"
            alt="Logo"
          />
          <div className="d-flex flex-column">
            <p
              className="m-0"
              style={{
                fontFamily: 'Castoro Titling',
                fontSize: '20px',
                color: 'white',
              }}
            >
              R.C. RAMOS CONSTRUCTION CORPORATION
            </p>
            <p
              className="m-0"
              style={{
                fontFamily: 'Castoro Titling',
                fontSize: '14px',
                color: '#ccc',
              }}
            >
              HUMAN RESOURCE & ATTENDANCE INFORMATION SYSTEM
            </p>
          </div>
        </div>
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto d-flex justify-content-end w-100">
              <div className="d-flex">
                <li className="nav-item" style={{ fontSize: '15px', marginRight: '20px' }}>
                  <Link
                    className="nav-link"
                    style={getLinkStyle(`/employee_home/${id}`)}
                    to={`/employee_home/${id}`}
                  >
                    <i className="bi bi-house-door" style={{ fontSize: '2rem' }}></i>
                    Home
                  </Link>
                </li>
                <li className="nav-item" style={{ fontSize: '15px', marginRight: '20px' }}>
                  <Link
                    className="nav-link"
                    style={getLinkStyle(`/employee_files/${id}`)}
                    to={`/employee_files/${id}`}
                  >
                    <i className="bi bi-file-earmark" style={{ fontSize: '2rem' }}></i>
                    201 Files
                  </Link>
                </li>
                <li className="nav-item" style={{ fontSize: '15px', marginRight: '20px' }}>
                  <Link
                    className="nav-link"
                    style={getLinkStyle(`/employee_attendance/${id}`)}
                    to={`/employee_attendance/${id}`}
                  >
                    <i className="bi bi-calendar-check" style={{ fontSize: '2rem' }}></i>
                    Attendance
                  </Link>
                </li>
                <li className="nav-item" style={{ fontSize: '15px', marginRight: '20px' }}>
                  <Link
                    className="nav-link"
                    style={getLinkStyle(`/employee_leave/${id}`)}
                    to={`/employee_leave/${id}`}
                  >
                    <i className="bi bi-calendar3" style={{ fontSize: '2rem' }}></i>
                    Leave
                  </Link>
                </li>
              </div>
              <li className="nav-item" style={{ fontSize: '15px', marginRight: '60px' }}>
                <Link
                  className="nav-link"
                  style={getLinkStyle(`/employee_profile/${id}`)}
                  to={`/employee_profile/${id}`}
                >
                  <i className="bi bi-person" style={{ fontSize: '2rem' }}></i>
                  Profile
                </Link>
              </li>
              <li className="nav-item dropdown d-flex align-items-center" style={{ fontSize: '20px' }}>
                <div className="dropdown-toggle nav-link d-flex align-items-center" onClick={toggleDropdown}>
                  {employee.image ? (
                    <img
                      src={`https://hrais-rcramoscc-server.onrender.com/Images/${employee.image}`}
                      className="rounded-circle"
                      alt="Employee"
                      style={{ width: '45px', height: '45px' }}
                    />
                  ) : (
                    <div className="rounded-circle" style={{ width: '45px', height: '45px', backgroundColor: '#6c757d' }}></div>
                  )}
                  <span className="ms-2">{employee.fname} {employee.lname}</span>
                </div>
                {dropdownVisible && (
                  <ul className="dropdown-menu dropdown-menu-end show">
                    <li><a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a></li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-5 pt-3">
        <h2 className="mb-3" style={{ fontSize: '35px', fontWeight: 'bold', fontFamily: 'Montserrat', marginTop:'160px' }}> My Attendance</h2>
        <div className="d-flex justify-content-between mb-4">
          <div className="d-flex flex-wrap align-items-center">
            <div className="form-group me-2">
              <label htmlFor="fromDate">From</label>
              <input
                type="date"
                id="fromDate"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="form-control custom-width"
              />
            </div>
            <div className="form-group me-2">
              <label htmlFor="toDate">To</label>
              <input
                type="date"
                id="toDate"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="form-control custom-width"
              />
            </div>
            <button className="btn btn-secondary ms-3 btn-custom-small" onClick={handleResetFilter}>Reset Filters</button>
          </div>
          <div className="d-flex align-items-center">
            <label htmlFor="statusFilter" className="form-label me-2">Status:</label>
            <select
              id="statusFilter"
              className="form-select custom-width"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="Fulfilled">Fulfilled</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Display Total Attendance Records */}
        <div className="mb-4" style={{ fontSize: '20px', marginBottom: '10px', fontFamily: 'Montserrat' }}>
          <h4>Total Attendance Records: {totalAttendanceRecords}</h4>
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time In</th>
              <th>Time Out</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentAttendance.length > 0 ? (
              currentAttendance.map((record, index) => (
                <tr key={index}>
                  <td>{formatDate(record.date)}</td>
                  <td>{formatTime(record.time_in)}</td>
                  <td>{formatTime(record.time_out)}</td>
                  <td><span className={getStatusBadge(record.status)}>{record.status}</span></td>
                  <td>
                    <button className="btn btn-info btn-sm" onClick={() => handleFullDetailsClick(record)}>
                      <i className="bi bi-eye"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No records found</td>
              </tr>
            )}
          </tbody>
        </table>

        {filteredAttendance.length > attendancePerPage && (
          <nav>
            <ul className="pagination">
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={nextPage}
                  disabled={currentPage === Math.ceil(totalRecords / attendancePerPage)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        )}

        <ToastContainer
          position="top-center"
          style={{
            fontSize: '20px',
            width: '500px',
            padding: '20px',
            borderRadius: '10px',
          }}/>
      </div>
    </div>
  );
};

export default EmployeeAttendance;
