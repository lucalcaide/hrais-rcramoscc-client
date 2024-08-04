import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const RecruitmentHome = () => {
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [activeEmployeeTotal, setActiveEmployeeTotal] = useState(0);
  const [inactiveEmployeeTotal, setInactiveEmployeeTotal] = useState(0);
  const [newEmployeeTotal, setNewEmployeeTotal] = useState(0);

  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    employeeCount();
    fetchNewEmployeeCount();
    fetchEmployeeStatusCounts();
   
    // Update date and time every second
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

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
  <div
    className="col-md-10"
    style={{
      backgroundColor: '#f8f9fa',
      color: "#0b283b",
      padding: '20px',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
      borderRadius: '8px',
    }}
  >
    <span
      style={{
        fontFamily: 'Montserrat',
        fontSize: '20px',
        color: 'black',
      }}
    >
      <i className="fs-4 bi-graph-up-arrow me-2"></i>Statistics
    </span>
    <div className="d-flex flex-wrap justify-content-between">
      <div className="col-md-2 mb-3">
        <div
          className="card stat-card border-0 rounded-3 shadow-sm dashboard-card"
          style={{
            backgroundColor: '#0b283b',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
          }}
        >
        </div>
      </div>

      <div className="container mt-3">
  <div className="row justify-content-center mb-3">
    <div className="col-md-6 d-flex justify-content-center">
      <div className="d-flex">
        <Link to="/recruitmentdashboard/employee" className="no-underline">
          <div
            className="card border-0 rounded-3 shadow-sm"
            style={{
              backgroundColor: '#0b283b',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
              width: '300px',  // Match the width of the bottom cards
              marginRight: '10px'  // Add space between cards
            }}
          >
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

        <div
          className="card border-0 rounded-3 shadow-sm"
          style={{
            backgroundColor: '#0b283b',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
            width: '300px',  // Match the width of the bottom cards
            marginLeft: '10px'  // Add space between cards
          }}
        >
          <div className="card-body text-center">
            <h4 className="card-title" style={{ color: 'wheat' }}>NEW HIRES</h4>
            <hr />
            <div className="d-flex justify-content-between">
              <span className="total-label" style={{ color: '#ccc', fontSize: '15px' }}>TOTAL</span>
              <span style={{ color: 'white', fontSize: '20px' }}>{newEmployeeTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="row justify-content-center">
    <div className="col-md-6 d-flex justify-content-center">
      <div className="d-flex">
        <div
          className="card border-0 rounded-3 shadow-sm me-2"
          style={{
            backgroundColor: 'rgba(0, 128, 0, 0.1)',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
            width: '300px',  // Ensure all cards are the same width
          }}
        >
          <div className="card-body text-center">
            <h4 className="card-title" style={{ color: 'green' }}>ACTIVE EMPLOYEE</h4>
            <hr />
            <div className="d-flex justify-content-between">
              <span className="total-label" style={{ color: 'black', fontSize: '15px' }}>TOTAL</span>
              <span style={{ color: 'green', fontSize: '20px' }}>{activeEmployeeTotal}</span>
            </div>
          </div>
        </div>

        <div
          className="card border-0 rounded-3 shadow-sm"
          style={{
            backgroundColor: 'rgba(255, 0, 0, 0.1)',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
            width: '300px',  // Ensure all cards are the same width
          }}
        >
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
</div>

            </div>
          </div>
  );
};

export default RecruitmentHome
