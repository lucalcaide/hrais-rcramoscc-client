import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const PayrollHome = () => {

  const [pendingLeaveTotal, setPendingLeaveTotal] = useState(0);
  const [fulfilledLeaveTotal, setFulfilledLeaveTotal] = useState(0);
  const [rejectedLeaveTotal, setRejectedLeaveTotal] = useState(0);
  const [pendingAttendanceTotal, setPendingAttendanceTotal] = useState(0);
  const [fulfilledAttendanceTotal, setFulfilledAttendanceTotal] = useState(0);
  const [rejectedAttendanceTotal, setRejectedAttendanceTotal] = useState(0);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    fetchPendingLeaveCount();
    fetchFulfilledLeaveCount();
    fetchRejectedLeaveCount();
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


  const fetchPendingLeaveCount = () => {
    axios.get("http://localhost:3000/auth/pending_leave_count").then((result) => {
      if (result.data.Status) {
        setPendingLeaveTotal(result.data.Result[0].pendingLeaveCount);
      }
    });
  };

  const fetchFulfilledLeaveCount = () => {
    axios.get("http://localhost:3000/auth/fulfilled_leave_count").then((result) => {
      if (result.data.Status) {
        setFulfilledLeaveTotal(result.data.Result[0].fulfilledLeaveCount);
      }
    });
  };

  const fetchRejectedLeaveCount = () => {
    axios.get("http://localhost:3000/auth/rejected_leave_count").then((result) => {
      if (result.data.Status) {
        setRejectedLeaveTotal(result.data.Result[0].rejectedLeaveCount);
      }
    });
  };

  const fetchPendingAttendanceCount = () => {
    axios.get("http://localhost:3000/auth/pending_count").then((result) => {
      if (result.data.Status) {
        setPendingAttendanceTotal(result.data.Result);
      }
    });
  };

  const fetchFulfilledAttendanceCount = () => {
    axios.get("http://localhost:3000/auth//fulfilled_count").then((result) => {
      if (result.data.Status) {
        setFulfilledAttendanceTotal(result.data.Result);
      }
    });
  };

  const fetchRejectedAttendanceCount = () => {
    axios.get("http://localhost:3000/auth/rejected_count").then((result) => {
      if (result.data.Status) {
        setRejectedAttendanceTotal(result.data.Result);
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
        

        <div className="d-flex justify-content-around mt-5">
          <div className="col-md-10" style={{ backgroundColor: "#0b283b", padding: "20px", boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)", borderRadius: "8px" }}>
            <span style={{ fontFamily: "Montserrat", fontWeight: "bold", fontSize: "30px", color: "wheat" }}>Welcome to Payroll Dashboard!</span>
            <br />
            <span style={{ fontFamily: "Montserrat", fontWeight: 'bold', color: '#ccc', fontSize: "26px" }}>
              Today is {formatDateTime(currentDateTime)}
            </span>
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

export default PayrollHome
