import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx';
import "bootstrap-icons/font/bootstrap-icons.css";

const EmployeeAttendanceFullDetails = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState({});
    const location = useLocation();
    const navigate = useNavigate();
    const { record } = location.state || {};
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [updatedRecord, setUpdatedRecord] = useState(record);

    useEffect(() => {
        axios.get(`https://hrais-rcramoscc-server.onrender.com/employee/home/${id}`)
            .then(result => {
                setEmployee(result.data[0]);
            })
            .catch(err => console.log(err));
    }, [id, record]);

    if (!record) {
        return (
            <div className="container mt-5">
                <h2 className="text-center">No record found</h2>
            </div>
        );
    }

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

    // Function to format time as '7:15 AM'
    const formatTime = (time) => {
        return new Date(`1970-01-01T${time}`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
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
            ['Employee', 'Date', 'Time In', 'Time Out', 'Status', 'Rate Per Hour', 'Rate Per Minute', 'Hours Worked', 'Late', 'Extra', 'Earnings', 'Tardiness', 'Overtime', 'Total Amount to Pay'],
            [updatedRecord.emp_no, new Date(updatedRecord.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }), formatTime(updatedRecord.time_in), formatTime(updatedRecord.time_out), updatedRecord.status, `₱${updatedRecord.rate_per_hour}`, `₱${updatedRecord.rate_per_minute}`, `${updatedRecord.hours_worked} hours`, `${updatedRecord.late} minutes`, `${updatedRecord.extra} minutes`, `₱${updatedRecord.earnings}`, `- ₱${updatedRecord.tardiness}`, `+ ₱${updatedRecord.overtime}`, `₱${updatedRecord.total_amount_pay}`]
        ];

        const ws = XLSX.utils.aoa_to_sheet(attendanceData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Attendance Details');
        XLSX.writeFile(wb, `${updatedRecord.emp_no}_${new Date(updatedRecord.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}_attendance_details.xlsx`);
    };

    return (
        <div>
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
                                            src={`https://hrais-rcramoscc-server.onrender.com/Public/Images/${employee.image}`}
                                            className="rounded-circle"
                                            alt="Employee"
                                            style={{ width: '45px', height: '45px' }}
                                        />
                                    ) : (
                                        <div className="rounded-circle" style={{ width: '45px', height: '45px', backgroundColor: '#d9d9d9' }}></div>
                                    )}
                                    <i className="bi bi-caret-down ms-2" style={{ fontSize: '1.5rem' }}></i>
                                </div>
                                {dropdownVisible && (
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to={`/employee_profile/${id}`}>Profile</Link></li>
                                        <li><Link className="dropdown-item" to={`/employee_leave/${id}`}>Leave</Link></li>
                                        <li><a className="dropdown-item" onClick={handleLogout}>Logout</a></li>
                                    </ul>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container mt-3" style={{ fontFamily: 'Montserrat' }}>
      <ToastContainer 
        position="top-center" 
        style={{ 
          fontSize: '20px', 
          width: '500px', 
          padding: '20px', 
          borderRadius: '10px', }}/>
          
      <div className='d-flex justify-content-center mb-4'>
        <span className="header-title" style={{ fontSize: '35px', paddingTop: '155px' }}>ATTENDANCE FULL DETAILS</span>
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
                <td style={{ fontSize: '24px', padding: '10px' }}>{updatedRecord.status}</td>
              </tr>
              <tr>
                <td style={{ fontSize: '22px', padding: '10px' }}>Start Time</td>
                <td style={{ fontSize: '24px', padding: '10px' }}>{formatTime(updatedRecord.start_time)}</td>
              </tr>
              <tr>
                <td style={{ fontSize: '22px', padding: '10px' }}>Out Time</td>
                <td style={{ fontSize: '24px', padding: '10px' }}>{formatTime(updatedRecord.out_time)}</td>
              </tr>
              <tr>
                <td style={{ fontSize: '22px', padding: '10px' }}>Hourly Rate</td>
                <td style={{ fontSize: '24px', padding: '10px' }}>₱{updatedRecord.rate_per_hour}</td>
              </tr>
              <tr>
                <td style={{ fontSize: '22px', padding: '10px' }}>Minute Rate</td>
                <td style={{ fontSize: '24px', padding: '10px' }}>₱{updatedRecord.rate_per_minute}</td>
              </tr>
              <tr>
                <td colSpan="2" style={{ fontSize: '25px', padding: '15px', textAlign: 'center', backgroundColor: '#0b283b', color: 'wheat' }}>Payroll Calculation</td>
              </tr>
              <tr>
                <td style={{ fontSize: '22px', padding: '10px' }}>Hours Worked</td>
                <td style={{ fontSize: '24px', padding: '10px' }}>{updatedRecord.hours_worked}</td>
              </tr>
              <tr>
                <td style={{ fontSize: '22px', padding: '10px' }}>Late</td>
                <td style={{ fontSize: '24px', padding: '10px' }}>{updatedRecord.late}</td>
              </tr>
              <tr>
                <td style={{ fontSize: '22px', padding: '10px' }}>Extra</td>
                <td style={{ fontSize: '24px', padding: '10px' }}>{updatedRecord.extra}</td>
              </tr>
              <tr>
                <td style={{ fontSize: '22px', padding: '10px' }}>Earnings</td>
                <td style={{ fontSize: '24px', padding: '10px' }}>₱{updatedRecord.earnings}</td>
              </tr>
              <tr>
                <td style={{ fontSize: '22px', padding: '10px' }}>Tardiness</td>
                <td style={{ fontSize: '24px', padding: '10px', color: 'red' }}> - ₱{updatedRecord.tardiness}</td>
              </tr>
              <tr>
                <td style={{ fontSize: '22px', padding: '10px' }}>Overtime</td>
                <td style={{ fontSize: '24px', padding: '10px', color: 'green' }}> + ₱{updatedRecord.overtime}</td>
              </tr>
              <tr>
                <td style={{ fontSize: '22px', padding: '10px' }}>Total Amount to Pay</td>
                <td style={{ fontSize: '24px', padding: '10px', fontWeight:'bold' }}>₱{updatedRecord.total_amount_pay}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
            <ToastContainer />
        </div>
    );
};

export default EmployeeAttendanceFullDetails;
