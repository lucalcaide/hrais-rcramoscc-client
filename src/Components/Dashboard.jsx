import React from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios.get('https://hrais-rcramoscc-server.onrender.com/auth/logout')
      .then(result => {
        if (result.data.Status) {
          localStorage.removeItem('valid')
          navigate('/');
        }
      });
  };

  const getLinkStyle = (path) => {
    return location.pathname === path ? 
      { 
        textDecoration: 'underline', 
        textDecorationColor: '#e5ecf1', 
        textDecorationThickness: '3px', 
        textUnderlineOffset: '15px'
      } : 
      { 
        color: "#d8c4c4" 
      };
  };

  return (
    <div className="dashboard-container">
      <div className="row flex-nowrap">
        <div className="col-auto col-xl-2 px-sm-2 dashboard">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <div className="logo-container">
              <img
                src="/Images/r.c. logo.jpeg"
                className="logo-size mt-5 me-2 ms-1"
                alt="Logo"
              />
              <h6 className="mt-5" style={{ fontWeight: "bold", fontSize: '18px', color: "#d8c4c4", fontFamily:'Kodchasan' }}>R.C. Ramos Construction Corporation</h6>
            </div>
            <Link
              to="/dashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-3 text-white text-decoration-none"
            >
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >

              <div className="w-100 d-flex align-items-center my-2">
                <span className="px-2" style={{ color: "#d8c4c4" }}>Panel</span>
                <hr className="flex-grow-1 ms-2" style={{ borderTop: "1px solid #d8c4c4" }} />
              </div>
              
              <li className="w-100">
                <Link
                  to="/dashboard"
                  className="nav-link text-white px-0 align-middle"
                  style={getLinkStyle('/dashboard')}
                >
                  <i className="fs-4 ms-3 bi-layout-wtf" style={{ color: "#e5ecf1" }}></i>
                  <span className="ms-2 d-none d-sm-inline" style={{ fontSize: '20px', color:'wheat', fontWeight:'bold' }}>Dashboard</span>
                </Link>
              </li>

              <li className="w-100">
                <Link
                  to="/dashboard/employee"
                  className="nav-link px-0 align-middle text-white"
                  style={getLinkStyle('/dashboard/employee')}
                >
                  <i className="fs-4 ms-3 bi-people" style={{ color: "#e5ecf1" }}></i>
                  <span className="ms-2 d-none d-sm-inline" style={{ fontSize: '20px', color:'wheat', fontWeight:'bold' }}>Employees</span>
                </Link>
              </li>

              <li className="w-100">
                <Link
                  to="/dashboard/department"
                  className="nav-link px-0 align-middle text-white"
                  style={getLinkStyle('/dashboard/department')}
                >
                  <i className="fs-4 ms-3 bi-buildings" style={{ color: "#e5ecf1" }}></i>
                  <span className="ms-2 d-none d-sm-inline" style={{ fontSize: '20px', color:'wheat', fontWeight:'bold' }}>Department</span>
                </Link>
              </li>

              <li className="w-100">
                <Link
                  to="/dashboard/project"
                  className="nav-link px-0 align-middle text-white"
                  style={getLinkStyle('/dashboard/project')}
                >
                  <i className="fs-4 ms-3 bi-gear" style={{ color: "#e5ecf1" }}></i>
                  <span className="ms-2 d-none d-sm-inline" style={{ fontSize: '20px', color:'wheat', fontWeight:'bold' }}>Project/Unit</span>
                </Link>
              </li>

              <li className="w-100">
                <Link
                  to="/dashboard/position"
                  className="nav-link px-0 align-middle text-white"
                  style={getLinkStyle('/dashboard/position')}
                >
                  <i className="fs-4 ms-3 bi-tags" style={{ color: "#e5ecf1" }}></i>
                  <span className="ms-2 d-none d-sm-inline" style={{ fontSize: '20px', color:'wheat', fontWeight:'bold' }}>Position</span>
                </Link>
              </li>

              <li  className="w-100">
                <Link
                  to="/dashboard/201files"
                  className="nav-link px-0 align-middle text-white"
                  style={getLinkStyle('/dashboard/201files')}
                >
                  <i className="fs-4 ms-3 bi-folder" style={{ color: "#e5ecf1" }}></i>
                  <span className="ms-2 d-none d-sm-inline" style={{ fontSize: '20px', color:'wheat', fontWeight:'bold' }}>201 Files</span>
                </Link>
              </li>

              <li className="w-100">
                <Link
                  to="/dashboard/attendance"
                  className="nav-link px-0 align-middle text-white"
                  style={getLinkStyle('/dashboard/attendance')}
                >
                  <i className="fs-4 ms-3 bi-calendar-check" style={{ color: "#e5ecf1" }}></i>
                  <span className="ms-2 d-none d-sm-inline" style={{ fontSize: '20px', color:'wheat', fontWeight:'bold' }}>Attendance</span>
                </Link>
              </li>

              <li className="w-100">
                <Link
                  to="/dashboard/leave"
                  className="nav-link px-0 align-middle text-white"
                  style={getLinkStyle('/dashboard/leave')}
                >
                  <i className="fs-4 ms-3 bi-calendar3" style={{ color: "#e5ecf1" }}></i>
                  <span className="ms-2 d-none d-sm-inline" style={{ fontSize: '20px', color:'wheat', fontWeight:'bold' }}>Leave</span>
                </Link>
              </li>

              <div className="w-100 d-flex align-items-center my-2">
                <span className="px-2" style={{ color: "#d8c4c4" }}>Others</span>
                <hr className="flex-grow-1 ms-2" style={{ borderTop: "1px solid #d8c4c4" }} />
              </div>

	            <li className="w-100">
                <Link
                  to="/dashboard/terms_and_agreements"
                  className="nav-link px-0 align-middle text-white"
                  style={getLinkStyle('/dashboard/terms_and_agreements')}
                >
                  <i className="fs-4 ms-3 bi-info-lg" style={{ color: "#e5ecf1" }}></i>
                  <span className="ms-2 d-none d-sm-inline" style={{ fontSize: '20px', color:'wheat', fontWeight:'bold' }}>Terms & Agreements</span>
                </Link>
              </li>

              <li className="w-100">
                <Link
                  to="/dashboard/about_us"
                  className="nav-link px-0 align-middle text-white"
                  style={getLinkStyle('/dashboard/about_us')}
                >
                  <i className="fs-4 ms-3 bi-question-lg" style={{ color: "#e5ecf1" }}></i>
                  <span className="ms-2 d-none d-sm-inline" style={{ fontSize: '20px', color:'wheat', fontWeight:'bold' }}>About Us</span>
                </Link>
              </li>

              <li className="w-100" onClick={handleLogout}>
                <Link className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 ms-3 bi-power" style={{ color: "#e5ecf1" }}></i>
                  <span className="ms-2 d-none d-sm-inline" style={{ fontSize: '20px', color:'wheat', fontWeight:'bold' }}>Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="col p-0 m-0 page-bg">
          <div className="p-3 d-flex justify-content-center shadow">
            <h2 className='mt-3' style={{ fontFamily: 'Montserrat', color: '#0b283b', fontSize: '30px', fontWeight:'bold' }}>
              HUMAN RESOURCE & ATTENDANCE INFORMATION SYSTEM
            </h2>
          </div>
          
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
