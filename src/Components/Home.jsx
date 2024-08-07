import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [departmentTotal, setDepartmentTotal] = useState(0);
  const [projectTotal, setProjectTotal] = useState(0);
  const [positionTotal, setPositionTotal] = useState(0);
  const [pendingLeaveTotal, setPendingLeaveTotal] = useState(0);
  const [fulfilledLeaveTotal, setFulfilledLeaveTotal] = useState(0);
  const [rejectedLeaveTotal, setRejectedLeaveTotal] = useState(0);
  const [activeEmployeeTotal, setActiveEmployeeTotal] = useState(0);
  const [inactiveEmployeeTotal, setInactiveEmployeeTotal] = useState(0);
  const [newEmployeeTotal, setNewEmployeeTotal] = useState(0);
  const [pendingAttendanceTotal, setPendingAttendanceTotal] = useState(0);
  const [fulfilledAttendanceTotal, setFulfilledAttendanceTotal] = useState(0);
  const [rejectedAttendanceTotal, setRejectedAttendanceTotal] = useState(0);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    adminCount();
    employeeCount();
    departmentCount();
    projectCount();
    positionCount();
    fetchPendingLeaveCount();
    fetchFulfilledLeaveCount();
    fetchRejectedLeaveCount();
    fetchNewEmployeeCount();
    fetchEmployeeStatusCounts();
    fetchPendingAttendanceCount();
    fetchFulfilledAttendanceCount();
    fetchRejectedAttendanceCount();

    // Update date and time every second
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const adminCount = () => {
    axios.get("https://hrais-rcramoscc-server.onrender.com/auth/admin_count").then((result) => {
      if (result.data.Status) {
        setAdminTotal(result.data.Result[0].admin);
      }
    });
  };

  const employeeCount = () => {
    axios.get("https://hrais-rcramoscc-server.onrender.com/auth/employee_count").then((result) => {
      if (result.data.Status) {
        setEmployeeTotal(result.data.Result[0].employee);
      }
    });
  };

  const fetchEmployeeStatusCounts = () => {
    axios.get("https://hrais-rcramoscc-server.onrender.com/auth/employee_status_counts").then((result) => {
      if (result.data.Status) {
        setActiveEmployeeTotal(result.data.Result.activeCount);
        setInactiveEmployeeTotal(result.data.Result.inactiveCount);
      }
    });
  };

  const fetchNewEmployeeCount = () => {
    axios.get("https://hrais-rcramoscc-server.onrender.com/auth/new_employee_count").then((result) => {
      if (result.data.Status) {
        setNewEmployeeTotal(result.data.Result);
      }
    });
  };

  const departmentCount = () => {
    axios.get("https://hrais-rcramoscc-server.onrender.com/auth/department_count").then((result) => {
      if (result.data.Status) {
        setDepartmentTotal(result.data.Result[0].department);
      }
    });
  };

  const projectCount = () => {
    axios.get("https://hrais-rcramoscc-server.onrender.com/auth/project_count").then((result) => {
      if (result.data.Status) {
        setProjectTotal(result.data.Result[0].project);
      }
    });
  };

  const positionCount = () => {
    axios.get("https://hrais-rcramoscc-server.onrender.com/auth/position_count").then((result) => {
      if (result.data.Status) {
        setPositionTotal(result.data.Result[0].position);
      }
    });
  };

  const fetchPendingLeaveCount = () => {
    axios.get("https://hrais-rcramoscc-server.onrender.com/auth/pending_leave_count").then((result) => {
      if (result.data.Status) {
        setPendingLeaveTotal(result.data.Result[0].pendingLeaveCount);
      }
    });
  };

  const fetchFulfilledLeaveCount = () => {
    axios.get("https://hrais-rcramoscc-server.onrender.com/auth/fulfilled_leave_count").then((result) => {
      if (result.data.Status) {
        setFulfilledLeaveTotal(result.data.Result[0].fulfilledLeaveCount);
      }
    });
  };

  const fetchRejectedLeaveCount = () => {
    axios.get("https://hrais-rcramoscc-server.onrender.com/auth/rejected_leave_count").then((result) => {
      if (result.data.Status) {
        setRejectedLeaveTotal(result.data.Result[0].rejectedLeaveCount);
      }
    });
  };

  const fetchPendingAttendanceCount = () => {
    axios.get("https://hrais-rcramoscc-server.onrender.com/auth/pending_count").then((result) => {
      if (result.data.Status) {
        setPendingAttendanceTotal(result.data.pendingCount);
      }
    });
  };

  const fetchFulfilledAttendanceCount = () => {
    axios.get("https://hrais-rcramoscc-server.onrender.com/auth/fulfilled_count").then((result) => {
      if (result.data.Status) {
        setFulfilledAttendanceTotal(result.data.fulfilled_count);
      }
    });
  };

  const fetchRejectedAttendanceCount = () => {
    axios.get("https://hrais-rcramoscc-server.onrender.com/auth/rejected_count").then((result) => {
      if (result.data.Status) {
        setRejectedAttendanceTotal(result.data.rejected_count);
      }
    });
  };

  const formatDateTime = (date) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <div className="dashboard-container" style={{ fontFamily: 'Montserrat' }}>
        <div className="ms-2 mt-3">
          <Link to="/dashboard/createadmin" className='btn btn-color rounded-3 mt-3 no-underline' style={{ marginLeft: '30px' }}>
            <i className="bi bi-plus-circle me-1"></i> <span className="btn-text" style={{ fontFamily: 'Montserrat' }}>Admin</span>
          </Link>
          <Link to="/dashboard/createrecruitment" className='btn btn-color rounded-3 ms-2 mt-3 no-underline'>
            <i className="bi bi-plus-circle me-1"></i> <span className="btn-text" style={{ fontFamily: 'Montserrat' }}>Recruitment</span>
          </Link>
          <Link to="/dashboard/createpayroll" className='btn btn-color rounded-3 ms-2 mt-3 no-underline'>
            <i className="bi bi-plus-circle me-1"></i> <span className="btn-text" style={{ fontFamily: 'Montserrat' }}>Payroll</span>
          </Link>
        </div>

        <div className="d-flex justify-content-around mt-3">
          <div className="col-md-10" style={{ backgroundColor: "#0b283b", padding: "20px", boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)", borderRadius: "8px" }}>
            <span style={{ fontFamily: "Montserrat", fontWeight: "bold", fontSize: "30px", color: "wheat" }}>Welcome to Admin Dashboard!</span>
            <br />
            <span style={{ fontFamily: "Montserrat", fontWeight: 'bold', color: '#ccc', fontSize: "26px" }}>
              Today is {formatDateTime(currentDateTime)}
            </span>
          </div>
        </div>

        <div className="d-flex justify-content-around mt-3">
          <div className="col-md-10" style={{ backgroundColor: '#f8f9fa', color: "#0b283b", padding: '20px', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)', borderRadius: '8px' }}>
            <span style={{ fontFamily: 'Montserrat', fontSize: '20px', color: 'black' }}><i className="fs-4 bi-graph-up-arrow me-2"></i>Statistics</span>
            <div className="d-flex justify-content-between">
              <div className="col-md-2 me-2">
                <div className="card stat-card border-0 rounded-3 shadow-sm dashboard-card" style={{ backgroundColor: '#0b283b', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)' }}>
                  <div className="card-body text-center">
                    <h4 className="card-title" style={{ color: 'wheat' }}>ADMIN</h4>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <span className="total-label" style={{ color: '#ccc', fontSize: '15px' }}>TOTAL</span>
                      <span style={{ color: 'white', fontSize: '20px' }}>{adminTotal}</span>
                    </div>
                  </div>
                </div>
                <Link to="/dashboard/position" className="no-underline">
                  <div className="card stat-card border-0 rounded-3 shadow-sm dashboard-card mt-2" style={{ backgroundColor: '#0b283b', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)' }}>
                    <div className="card-body text-center">
                      <h4 className="card-title" style={{ color: 'wheat' }}>POSITION</h4>
                      <hr />
                      <div className="d-flex justify-content-between">
                        <span className="total-label" style={{ color: '#ccc', fontSize: '15px' }}>TOTAL</span>
                        <span style={{ color: 'white', fontSize: '20px' }}>{positionTotal}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-md-3 me-2">
                <Link to="/dashboard/employee" className="no-underline">
                  <div className="card stat-card border-0 rounded-3 shadow-sm dashboard-card" style={{ backgroundColor: '#0b283b', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)' }}>
                    <div className="card-body text-center">
                      <h4 className="card-title" style={{ color: 'wheat' }}>EMPLOYEE</h4>
                      <hr />
                      <div className="d-flex justify-content-between">
                        <span className="total-label" style={{ color: '#ccc', fontSize: '15px' }}>TOTAL</span>
                        <span style={{ color: 'white', fontSize: '20px' }}>{employeeTotal}</span>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link to="/dashboard/employee" className="no-underline">
                  <div className="card stat-card border-0 rounded-3 shadow-sm dashboard-card mt-2" style={{ backgroundColor: '#0b283b', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)' }}>
                    <div className="card-body text-center">
                      <h4 className="card-title" style={{ color: 'wheat' }}> NEW HIRES</h4>
                      <hr />
                      <div className="d-flex justify-content-between">
                        <span className="total-label" style={{ color: '#ccc', fontSize: '15px' }}>TOTAL</span>
                        <span style={{ color: 'white', fontSize: '20px' }}>{newEmployeeTotal}</span>
                      </div>
                    </div>
                  </div>
                </Link>

              </div>

              <div className="col-md-3 me-2">
                <Link to="/dashboard/department" className="no-underline">
                  <div className="card stat-card border-0 rounded-3 shadow-sm dashboard-card" style={{ backgroundColor: '#0b283b', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)' }}>
                    <div className="card-body text-center">
                      <h4 className="card-title" style={{ color: 'wheat' }}>DEPARTMENT</h4>
                      <hr />
                      <div className="d-flex justify-content-between">
                        <span className="total-label" style={{ color: '#ccc', fontSize: '15px' }}>TOTAL</span>
                        <span style={{ color: 'white', fontSize: '20px' }}>{departmentTotal}</span>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="card border-0 rounded-3 shadow-sm mt-2" style={{ backgroundColor: 'rgba(0, 128, 0, 0.1)', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)' }}>
                  <div className="card-body text-center">
                    <h4 className="card-title" style={{ color: 'green' }}>ACTIVE EMPLOYEE</h4>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <span className="total-label" style={{ color: 'black', fontSize: '15px' }}>TOTAL</span>
                      <span style={{ color: 'green', fontSize: '20px' }}>{activeEmployeeTotal}</span>
                    </div>
                  </div>
                </div>

              </div>

              <div className="col-md-3 me-2">
                <Link to="/dashboard/project" className="no-underline">
                  <div className="card stat-card border-0 rounded-3 shadow-sm dashboard-card" style={{ backgroundColor: '#0b283b', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)' }}>
                    <div className="card-body text-center">
                      <h4 className="card-title" style={{ color: 'wheat' }}>PROJECT/UNIT</h4>
                      <hr />
                      <div className="d-flex justify-content-between">
                        <span className="total-label" style={{ color: '#ccc', fontSize: '15px' }}>TOTAL</span>
                        <span style={{ color: 'white', fontSize: '20px' }}>{projectTotal}</span>
                      </div>
                    </div>
                  </div>
                </Link>


                <div className="card border-0 rounded-3 shadow-sm mt-2" style={{ backgroundColor: 'rgba(255, 0, 0, 0.1)', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)' }}>
                  <div className="card-body text-center">
                    <h4 className="card-title" style={{ color: 'red' }}>INACTIVE EMPLOYEE</h4>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <span className="total-label" style={{ color: 'black', fontSize: '15px' }}>TOTAL</span>
                      <span style={{ color: 'red', fontSize: '20px' }}>{inactiveEmployeeTotal}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Link to="/dashboard/attendance" className="no-underline" style={{ color: 'black' }}>
          <div className="dashboard-container" style={{ fontFamily: 'Montserrat' }}>
            <div className="d-flex justify-content-around mt-3">
              <div className="col-md-10" style={{ backgroundColor: '#f8f9fa', padding: '20px', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)', borderRadius: '8px' }}>
                <span style={{ fontFamily: 'Montserrat', fontSize: '20px' }}><i className="fs-4 bi-calendar-check me-2"></i>Attendance</span>
                <div className="d-flex justify-content-start" style={{ gap: '70px' }}>
                  <div className="col-md-2 me-2">
                    <div className="card attendance-card border-0 rounded-3 shadow-sm dashboard-card" style={{ backgroundColor: '#0b283b', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)', width: '270px', height: '70px' }}>
                      <div className="card-body text-center d-flex justify-content-between">
                        <h4 className="card-title" style={{ color: 'wheat' }}>
                          <i className="bi bi-hourglass-split me-2"></i>PENDING
                        </h4>
                        <span style={{ color: 'white', fontSize: '20px' }}>{pendingAttendanceTotal}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2 me-2">
                    <div className="card attendance-card border-0 rounded-3 shadow-sm dashboard-card" style={{ backgroundColor: '#0b283b', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)', width: '270px', height: '70px' }}>
                      <div className="card-body text-center d-flex justify-content-between">
                        <h4 className="card-title" style={{ color: 'wheat' }}>
                          <i className="bi bi-check-circle me-2"></i>FULFILLED
                        </h4>
                        <span style={{ color: 'white', fontSize: '20px' }}>{fulfilledAttendanceTotal}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2 me-2">
                    <div className="card attendance-card border-0 rounded-3 shadow-sm dashboard-card" style={{ backgroundColor: '#0b283b', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)', width: '270px', height: '70px' }}>
                      <div className="card-body text-center d-flex justify-content-between">
                        <h4 className="card-title" style={{ color: 'wheat' }}>
                          <i className="bi bi-x-circle me-2"></i>REJECTED
                        </h4>
                        <span style={{ color: 'white', fontSize: '20px' }}>{rejectedAttendanceTotal}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>

        <Link to="/dashboard/leave" className="no-underline" style={{ color: 'black' }}>
          <div className="dashboard-container" style={{ fontFamily: 'Montserrat' }}>
            <div className="d-flex justify-content-around mt-3">
              <div className="col-md-10" style={{ backgroundColor: '#f8f9fa', padding: '20px', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)', borderRadius: '8px' }}>
                <span style={{ fontFamily: 'Montserrat', fontSize: '20px' }}><i className="fs-4 bi-calendar3 me-2"></i>Leave</span>
                <div className="d-flex justify-content-start" style={{ gap: '70px' }}>
                  <div className="col-md-2 me-2">
                    <div className="card leave-card border-0 rounded-3 shadow-sm dashboard-card" style={{ backgroundColor: '#0b283b', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)', width: '270px', height: '70px' }}>
                      <div className="card-body text-center d-flex justify-content-between">
                        <h4 className="card-title" style={{ color: 'wheat' }}>
                          <i className="bi bi-hourglass-split me-2"></i>PENDING
                        </h4>
                        <span style={{ color: 'white', fontSize: '20px' }}>{pendingLeaveTotal}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2 me-2">
                    <div className="card leave-card border-0 rounded-3 shadow-sm dashboard-card" style={{ backgroundColor: '#0b283b', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)', width: '270px', height: '70px' }}>
                      <div className="card-body text-center d-flex justify-content-between">
                        <h4 className="card-title" style={{ color: 'wheat' }}>
                          <i className="bi bi-check-circle me-2"></i>FULFILLED
                        </h4>
                        <span style={{ color: 'white', fontSize: '20px' }}>{fulfilledLeaveTotal}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2 me-2">
                    <div className="card leave-card border-0 rounded-3 shadow-sm dashboard-card" style={{ backgroundColor: '#0b283b', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)', width: '270px', height: '70px' }}>
                      <div className="card-body text-center d-flex justify-content-between">
                        <h4 className="card-title" style={{ color: 'wheat' }}>
                          <i className="bi bi-x-circle me-2"></i>REJECTED
                        </h4>
                        <span style={{ color: 'white', fontSize: '20px' }}>{rejectedLeaveTotal}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>

      </div>
    </div>
  );
};

export default Home;
