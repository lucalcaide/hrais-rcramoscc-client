import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const RecruitmentHome = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [departmentTotal, setDepartmentTotal] = useState(0);
  const [projectTotal, setProjectTotal] = useState(0);
  const [positionTotal, setPositionTotal] = useState(0);

  const [activeEmployeeTotal, setActiveEmployeeTotal] = useState(0);
  const [inactiveEmployeeTotal, setInactiveEmployeeTotal] = useState(0);
  const [newEmployeeTotal, setNewEmployeeTotal] = useState(0);

  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    adminCount();
    employeeCount();
    departmentCount();
    projectCount();
    positionCount();
    
    fetchNewEmployeeCount();
    fetchEmployeeStatusCounts();
   

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

  

  const handleBack = () => {
    navigate(-1); // Navigate back in the history
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
          <button className="btn btn-back-color rounded-pill ms-5 mt-3" onClick={handleBack}>
            <i className="bi bi-arrow-left-circle"></i>
          </button>
        </div>

        <div className="d-flex justify-content-around mt-3">
          <div className="col-md-10" style={{ backgroundColor: "#0b283b", padding: "20px", boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)", borderRadius: "8px" }}>
            <span style={{ fontFamily: "Montserrat", fontWeight: "bold", fontSize: "30px", color: "wheat" }}>Welcome to Recruitment Dashboard!</span>
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

        


      </div>
    </div>
  );
};

export default RecruitmentHome
