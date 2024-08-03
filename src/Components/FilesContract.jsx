import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap-icons/font/bootstrap-icons.css";

const FilesContract = () => {
  const [employee, setEmployee] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [totalContracts, setTotalContracts] = useState(0); // State for total contracts
  const employeesPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios.get("https://hrais-rcramoscc-server.onrender.com/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          const sortedEmployees = result.data.Result.sort((a, b) => {
            const nameA = `${a.lname}, ${a.fname} ${a.mname}`.toLowerCase();
            const nameB = `${b.lname}, ${b.fname} ${b.mname}`.toLowerCase();
            return nameA.localeCompare(nameB);
          });
          setEmployee(sortedEmployees);
          // Calculate total contracts
          const total = sortedEmployees.reduce((acc, curr) => acc + (curr.contract ? 1 : 0), 0);
          setTotalContracts(total);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id, emp_no) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the contract for employee number '${emp_no}'?`);
    if (confirmDelete) {
      axios.delete(`https://hrais-rcramoscc-server.onrender.com/auth/delete_contract/${id}`)
        .then(result => {
          if (result.data.Status) {
            // Update state first
            setEmployee(employee.filter(e => e.id !== id));
            // Then show toast
            toast.success(`Contract for employee number '${emp_no}' deleted successfully!`);
            // Update total contracts count
            setTotalContracts(prev => prev - 1);
          } else {
            toast.error(result.data.Error);
          }
        })
        .catch(err => console.log(err));
    } else {
      toast.info(`Deletion of contract for employee ${emp_no} cancelled.`);
    }
    window.location.reload();
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    setCurrentPage(1); // Reset to the first page on search
  };

  const handleFileChange = (id, emp_no, event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('contract', file);

      axios.post(`https://hrais-rcramoscc-server.onrender.com/auth/upload_contract/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(result => {
          if (result.data.Status) {
            setEmployee(employee.map(e => e.id === id ? { ...e, contract: result.data.contract } : e));
            toast.success(`Contract for employee number '${emp_no}' uploaded successfully!`);
            // Update total contracts count
            setTotalContracts(prev => prev + 1);
          } else {
            toast.error(result.data.Error);
          }
        })
        .catch(err => console.log(err));
    }
  };

  const filteredEmployees = employee.filter(e => {
    return e.emp_no.toString().includes(searchQuery) ||
      `${e.fname} ${e.mname} ${e.lname}`.toLowerCase().includes(searchQuery);
  });

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = showAll ? filteredEmployees : filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredEmployees.length / employeesPerPage)));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const handleBack = () => {
    navigate("/dashboard/201Files");
  };

  return (
    <div className='px-5 mt-3 employee' style={{ fontFamily: 'Montserrat' }}>
      <div className='d-flex justify-content-center mb-2 print-hide'>
        <span style={{ fontSize: '35px' }}> CONTRACT LIST</span>
      </div>
      <div className='d-flex justify-content-start mb-2 print-hide'>
        <button className="btn btn-back-color rounded-pill" style={{ marginRight: '10px' }} onClick={handleBack}>
          <i className="bi bi-arrow-left-circle"></i>
        </button>
      </div>

      <div className="input-group mt-3 print-hide">
        <span className="input-group-text" id="search-addon" style={{ backgroundColor: '#0b283b' }}>
          <i style={{ color: 'wheat' }} className="bi bi-search"></i>
        </span>
        <input
          type="text"
          placeholder="ID Number or Name"
          className="form-control form-control-lg"
          value={searchQuery}
          onChange={handleSearch}
          style={{ fontSize: '22px', fontFamily: 'Montserrat' }}
        />
      </div>

      {/* Pagination */}
      <div className="pagination mt-3 d-flex justify-content-end print-hide" style={{ display: showAll ? 'none' : 'flex' }}>
        <button
          onClick={prevPage}
          className="btn btn-color"
          disabled={currentPage === 1}
        >
          <i className="bi bi-caret-left-fill me-2" style={{ fontSize: '20px' }}></i>
          Previous
        </button>

        <span className="btn btn-color" style={{ margin: '0 3px', fontSize: '18px' }}>
          Page {currentPage} of {Math.ceil(filteredEmployees.length / employeesPerPage)}
        </span>

        <button
          onClick={nextPage}
          className="btn btn-color"
          disabled={currentPage === Math.ceil(filteredEmployees.length / employeesPerPage)}
        >
          Next
          <i className="bi bi-caret-right-fill ms-2" style={{ fontSize: '20px' }}></i>
        </button>

        <button
          className="btn btn-color rounded-3 ms-3"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Paginated" : "Show All"}
        </button>
      </div>

      {/* Display total contracts */}
      <div className="mt-1">
        <p style={{fontSize:'20px'}}>Total Contracts: {totalContracts}</p>
      </div>

      {filteredEmployees.length === 0 ? (
        <div className="text-center mt-3" style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '20px', minHeight: 'calc(100vh - 500px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          No Result Found.
        </div>
      ) : (
        <div className='mt-3 employee'>
          <div className='mt-3 w-100' id="employee-table">
            <div style={{ overflowX: 'auto' }}>
              <table className="table table-striped mt-3">
                <thead>
                  <tr>
                    <th style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'left' }}>ID Number</th>
                    <th style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'left' }}>Full Name</th>
                    <th style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'left' }}>File Name</th>
                    <th style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'left' }}>Contract</th>
                    <th className="print-hide-actions" style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'left' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEmployees.map(e => (
                    <tr key={e.id}>
                      <td style={{ fontSize: '27px', textAlign: 'left', verticalAlign: 'middle' }}>{e.emp_no}</td>
                      <td style={{ fontSize: '23px', textAlign: 'left', verticalAlign: 'middle' }}>{e.lname}, {e.fname} {e.mname}</td>
                      <td style={{ fontSize: '20px', fontStyle: 'italic', textAlign: 'left', verticalAlign: 'middle' }}>{e.contract}</td>
                      <td style={{ fontSize: '18px', textAlign: 'left', verticalAlign: 'middle' }}>
                        {e.contract ? (
                          <a href={`https://hrais-rcramoscc-server.onrender.com/Contracts/` + e.contract} className='btn btn-file-color btn-file-text rounded-pill' target="_blank" rel="noopener noreferrer">View Contract</a>
                        ) : (
                          <span style={{ color: 'gray', fontWeight: 'bold', fontSize: '23px' }}>No contract uploaded</span>
                        )}
                      </td>
                      <td className="print-hide-actions" style={{ textAlign: 'left', verticalAlign: 'middle' }}>
                        {!e.contract && (
                          <>
                            <input
                              type="file"
                              accept="application/pdf"
                              onChange={(event) => handleFileChange(e.id, e.emp_no, event)}
                              style={{ display: 'none' }}
                              id={`fileInput-${e.id}`}
                            />
                            <label htmlFor={`fileInput-${e.id}`} className="bi bi-box-arrow-up btn btn-success rounded-pill" style={{ marginRight: '5px', fontSize: '23px' }}>
                            </label>
                          </>
                        )}
                        {e.contract && (
                          <button className="bi bi-trash btn btn-danger rounded-pill" style={{ fontSize: '23px' }} onClick={() => handleDelete(e.id, e.emp_no)}>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
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

export default FilesContract;
