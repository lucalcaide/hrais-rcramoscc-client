import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx';
import "bootstrap-icons/font/bootstrap-icons.css"; 

const Position = () => {
  const [positions, setPositions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [editPositionId, setEditPositionId] = useState(null);
  const [editPositionName, setEditPositionName] = useState('');
  const positionsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://hrais-rcramoscc-server.onrender.com/auth/position')
      .then(result => {
        if (result.data.Status) {
          const sortedPositions = result.data.Result.sort((a, b) => a.name.localeCompare(b.name));
          setPositions(sortedPositions);
        } else {
          toast.error(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id, name) => {
    const confirmDelete = window.confirm(`Are you sure to delete '${name}' position?`);

    if (confirmDelete) {
      axios.delete(`https://hrais-rcramoscc-server.onrender.com/auth/delete_position/${id}`)
        .then(result => {
          if (result.data.Status) {
            setPositions(positions.filter(pos => pos.id !== id));
            toast.success(`${name} deleted successfully!`);
          } else {
            toast.error(result.data.Error);
          }
        })
        .catch(err => console.log(err));
    } else {
      toast.info(`Deletion of ${name} cancelled.`);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    setCurrentPage(1); // Reset to the first page on search
  };

  const handleEdit = (id, name) => {
    setEditPositionId(id);
    setEditPositionName(name);
  };

  const handleSave = (id) => {
    axios.put(`https://hrais-rcramoscc-server.onrender.com/auth/update_position/${id}`, { name: editPositionName })
      .then(result => {
        if (result.data.Status) {
          setPositions(positions.map(pos => pos.id === id ? { ...pos, name: editPositionName } : pos));
          setEditPositionId(null);
          setEditPositionName('');
          toast.success('Position updated successfully!');
        } else {
          toast.error(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  const handleCancel = () => {
    setEditPositionId(null);
    setEditPositionName('');
  };

  const filteredPositions = positions.filter(position =>
    position.name.toLowerCase().includes(searchQuery)
  );

  const indexOfLastPosition = currentPage * positionsPerPage;
  const indexOfFirstPosition = indexOfLastPosition - positionsPerPage;
  const currentPositions = showAll ? filteredPositions : filteredPositions.slice(indexOfFirstPosition, indexOfLastPosition);

  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredPositions.length / positionsPerPage)));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const handleBack = () => {
    navigate(-1); // Navigate back in the history
  };

  const handlePrint = () => {
    const printContent = document.getElementById('printableTable').innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // To reload the original content after printing
  };

  const handleExportToExcel = () => {
    const positionData = [['Position']];
    positions.forEach(pos => positionData.push([pos.name]));

    const ws = XLSX.utils.aoa_to_sheet(positionData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Positions');
    XLSX.writeFile(wb, 'positions.xlsx');
  };

  const editableInputStyle = {
    backgroundColor: 'lightgray'
  };

  return (
    <div className='px-5 mt-3 employee' style={{ fontFamily: 'Montserrat' }}>
      <div className='d-flex justify-content-center mb-2 print-hide'>
        <span style={{ fontSize: '35px' }}>POSITION LIST</span>
      </div>

      <div className='d-flex justify-content-start mb-2 print-hide'>
        <button className="btn btn-back-color rounded-pill" style={{ marginRight: '10px' }} onClick={handleBack}>
          <i className="bi bi-arrow-left-circle"></i>
        </button>

        <button className="btn btn-back-color rounded-pill" style={{ marginRight: '10px' }} onClick={handlePrint}>
          <i className="bi bi-printer"></i>
        </button>

        <button className="btn btn-back-color rounded-pill" onClick={handleExportToExcel}>
          <i className="bi bi-file-earmark-excel"></i>
        </button>

        <Link to="/dashboard/add_position" className='btn btn-color rounded-pill ms-2'>
          <i className="bi bi-plus-circle me-1"></i> <span className="btn-text" style={{ fontFamily: 'Montserrat' }}>Add Position</span>
        </Link>
      </div>

      <div className="input-group mt-3 print-hide">
        <span className="input-group-text" id="search-addon" style={{ backgroundColor: '#0b283b' }}>
          <i style={{ color: 'wheat' }} className="bi bi-search"></i>
        </span>
        <input
          type="text"
          placeholder="Position"
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
          Page {currentPage} of {Math.ceil(filteredPositions.length / positionsPerPage)}
        </span>

        <button
          onClick={nextPage}
          className="btn btn-color"
          disabled={currentPage === Math.ceil(filteredPositions.length / positionsPerPage)}
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

      {filteredPositions.length === 0 ? (
        <div className="text-center mt-3" style={{ fontSize: '24px', fontWeight: 'bold', fontFamily:'Montserrat', marginTop: '20px', minHeight: 'calc(100vh - 500px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          No Result Found.
        </div>
      ) : (
        <div className='mt-3 employee'>
          <div className='mt-3 w-100' id="printableTable">
            <div style={{ overflowX: 'auto' }}>
              <table className="table table-striped mt-3">
                <thead>
                  <tr>
                    <th style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'left' }}>POSITION</th>
                    <th className="print-hide-actions" style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'left' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPositions.map(position => (
                    <tr key={position.id}>
                      <td style={{ fontSize: '25px', textAlign: 'left', verticalAlign: 'middle' }}>
                        {editPositionId === position.id ? (
                          <input
                            type="text"
                            value={editPositionName}
                            onChange={(e) => setEditPositionName(e.target.value)}
                            className="form-control"
                            style={editableInputStyle}
                          />
                        ) : (
                          position.name
                        )}
                      </td>
                      <td className="print-hide-actions" style={{ textAlign: 'left', verticalAlign: 'middle' }}>
                        {editPositionId === position.id ? (
                          <div className="d-flex align-items-center">
                            <button
                              className="btn btn-save-color btn-sm mb-2 me-2"
                              onClick={() => handleSave(position.id)}
                            >
                              Save
                            </button>
                            <button
                              className="btn btn-outline-secondary btn-sm mb-2"
                              onClick={handleCancel}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="d-flex align-items-center">
                            <button
                              className="bi bi-pencil btn btn-light btn-sm me-2"
                              title="Edit position"
                              onClick={() => handleEdit(position.id, position.name)}
                              style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '20px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                              }}
                            >
                            </button>
                            <button
                              className="bi bi-trash btn btn-light btn-sm"
                              title="Delete position"
                              onClick={() => handleDelete(position.id, position.name)}
                              style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '20px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                              }}
                            >
                            </button>
                          </div>
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

export default Position;
