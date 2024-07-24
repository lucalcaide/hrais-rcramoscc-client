import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    emp_no: "",
    fname: "",
    mname: "",
    lname: "",
    gender: "",
    birth_date: "",
    phone_number: "",
    perma_address: "",
    emergency_name: "",
    emergency_relationship: "",
    emergency_phone_number: "",
    date_hired: "",
    pay_frequency: "",
    rate_per_day: "",
    rate_per_hour: "",
    employee_status: "",
    department: "",
    project: "",
    position: "",
    email: "",
    start_time: "",
    out_time: "",
    salary: "",
  });

  const navigate = useNavigate();
  const [department, setDepartment] = useState([]);
  const [project, setProject] = useState([]);
  const [position, setPosition] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/auth/department')
      .then(result => {
        if (result.data.Status) {
          setDepartment(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      }).catch(err => console.log(err));

    axios.get(`http://localhost:3000/auth/employee/${id}`)
      .then(result => {
        setEmployee({
          ...employee,
          emp_no: result.data.Result[0].emp_no,
          fname: result.data.Result[0].fname,
          mname: result.data.Result[0].mname,
          lname: result.data.Result[0].lname,
          gender: result.data.Result[0].gender,
          birth_date: formatDate(result.data.Result[0].birth_date),
          phone_number: result.data.Result[0].phone_number,
          perma_address: result.data.Result[0].perma_address,
          date_hired: formatDate(result.data.Result[0].date_hired),
          emergency_name: result.data.Result[0].emergency_name,
          emergency_relationship: result.data.Result[0].emergency_relationship,
          emergency_phone_number: result.data.Result[0].emergency_phone_number,
          pay_frequency: result.data.Result[0].pay_frequency,
          rate_per_day: result.data.Result[0].rate_per_day,
          rate_per_hour: result.data.Result[0].rate_per_hour,
          employee_status: result.data.Result[0].employee_status,
          department: result.data.Result[0].department,
          project: result.data.Result[0].project,
          position: result.data.Result[0].position,
          email: result.data.Result[0].email,
          start_time: result.data.Result[0].start_time,
          out_time: result.data.Result[0].out_time,
          salary: result.data.Result[0].salary,
        });
      }).catch(err => console.log(err));
  }, [id]);

  useEffect(() => {
    axios.get('http://localhost:3000/auth/project')
      .then(result => {
        if (result.data.Status) {
          setProject(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      }).catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/auth/position')
      .then(result => {
        if (result.data.Status) {
          setPosition(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      }).catch(err => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/auth/edit_employee/${id}`, employee)
      .then(result => {
        if (result.data.Status) {
          toast.success(`Employee '${employee.fname} ${employee.mname ? employee.mname + ' ' : ''}${employee.lname}' edited successfully!`);
          setTimeout(() => {
            navigate('/dashboard/employee'); // Redirect to the dashboard after creation
          }, 1000); // Delay for 1 seconds
        } else {
          toast.error(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleReset = () => {
    setEmployee({
      emp_no: "",
      fname: "",
      mname: "",
      lname: "",
      gender: "",
      birth_date: "",
      phone_number: "",
      perma_address: "",
      emergency_name: "",
      emergency_relationship: "",
      emergency_phone_number: "",
      date_hired: "",
      pay_frequency: "",
      rate_per_day: "",
      rate_per_hour: "",
      employee_status: "",
      department: "",
      project: "",
      position: "",
      email: "",
      start_time: "",
      out_time: "",
      salary: "",
    });
    toast.info('Form reset successfully!');
  };

  const handleBack = () => {
    navigate("/dashboard/employee");
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='card p-5 shadow-sm custom-shadow' style={{ maxWidth: '800px', width: '100%' }}>
        <div className="text-center mb-4">
          <h2 className='mt-3 mb-3 ' style={{ fontSize: '28px', fontWeight: 'bold', fontFamily: 'Montserrat', color: '#0b283b' }}>EDIT EMPLOYEE</h2>
          <p style={{ fontSize: '20px', fontFamily: 'Montserrat', color: '#666' }}>
            Modify the details below to update the <span style={{ fontWeight: 'bold' }}>employee</span> information.
          </p>
          <hr className="my-2" />
        </div>

        <form onSubmit={handleSubmit} onReset={handleReset} className="scrollable-table-form">
          <div className='mb-3'>
            <label style={labelStyle}>ID Number</label>
            <input
              style={inputFieldStyle}
              type='text'
              name='emp_no'
              value={employee.emp_no}
              autoComplete='off'
              onChange={(e) => setEmployee({ ...employee, emp_no: e.target.value })}
              className='form-control'
              required
            />
          </div>

          <div className='mb-3'>
            <label style={labelStyle}>First Name</label>
            <input
              style={inputFieldStyle}
              type='text'
              name='fname'
              value={employee.fname}
              autoComplete='off'
              onChange={(e) => setEmployee({ ...employee, fname: e.target.value })}
              className='form-control'
              required
            />
          </div>

          <div className='mb-3'>
            <label style={labelStyle}>Middle Name</label>
            <input
              style={inputFieldStyle}
              type='text'
              name='mname'
              value={employee.mname}
              autoComplete='off'
              onChange={(e) => setEmployee({ ...employee, mname: e.target.value })}
              className='form-control'
            />
          </div>

          <div className='mb-3'>
            <label style={labelStyle}>Last Name</label>
            <input
              style={inputFieldStyle}
              type='text'
              name='lname'
              value={employee.lname}
              autoComplete='off'
              onChange={(e) => setEmployee({ ...employee, lname: e.target.value })}
              className='form-control'
              required
            />
          </div>

          <div className='mb-3'>
            <label style={labelStyle}>Gender</label>
            <select
              style={inputFieldStyle}
              name='gender'
              value={employee.gender}
              autoComplete='off'
              onChange={(e) => setEmployee({ ...employee, gender: e.target.value })}
              className='form-select'
              required
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className='mb-3'>
            <label style={labelStyle}>Birth Date</label>
            <input
              style={inputFieldStyle}
              type='date'
              name='birth_date'
              value={employee.birth_date.substring(0, 10)}
              autoComplete='off'
              onChange={(e) => setEmployee({ ...employee, birth_date: e.target.value })}
              className='form-control'
              required
            />
          </div>

          <div className='mb-3'>
            <label style={labelStyle}>Phone Number</label>
            <input
              style={inputFieldStyle}
              type='text'
              name='phone_number'
              value={employee.phone_number}
              autoComplete='off'
              onChange={(e) => setEmployee({ ...employee, phone_number: e.target.value })}
              className='form-control'
              required
            />
          </div>

          <div className='mb-3'>
            <label style={labelStyle}>Permanent Address</label>
            <input
              style={inputFieldStyle}
              type='text'
              name='perma_address'
              value={employee.perma_address}
              autoComplete='off'
              onChange={(e) => setEmployee({ ...employee, perma_address: e.target.value })}
              className='form-control'
              required
            />
          </div>

          <div className='mb-3'>
            <label style={labelStyle}>Email</label>
            <input
              style={inputFieldStyle}
              type='email'
              name='email'
              value={employee.email}
              autoComplete='off'
              onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
              className='form-control'
              required
            />
          </div>

          <div className='text-center mb-3'>
            <span className="mb-3" style={{ fontSize: '25px', fontFamily: 'Montserrat', fontWeight: 'bold', color: '#0b283b' }}>
              Emergency Contact Details
            </span>
          </div>

          <div className='mb-3'>
            <label style={labelStyle}>Emergency Contact Name</label>
            <input
              style={inputFieldStyle}
              type='text'
              name='emergency_name'
              value={employee.emergency_name}
              autoComplete='off'
              onChange={(e) => setEmployee({ ...employee, emergency_name: e.target.value })}
              className='form-control'
              required
            />
          </div>

          <div className='mb-3'>
            <label style={labelStyle}>Relationship</label>
            <input
              style={inputFieldStyle}
              type='text'
              name='emergency_relationship'
              value={employee.emergency_relationship}
              autoComplete='off'
              onChange={(e) => setEmployee({ ...employee, emergency_relationship: e.target.value })}
              className='form-control'
              required
            />
          </div>

          <div className='mb-3'>
            <label style={labelStyle}>Contact Number</label>
            <input
              style={inputFieldStyle}
              type='text'
              name='emergency_phone_number'
              value={employee.emergency_phone_number}
              autoComplete='off'
              onChange={(e) => setEmployee({ ...employee, emergency_phone_number: e.target.value })}
              className='form-control'
              required
            />
          </div>

          <div className='text-center mb-3'>
            <span className="mb-3" style={{ fontSize: '25px', fontFamily: 'Montserrat', fontWeight: 'bold', color: '#0b283b' }}>
              Employment Details
            </span>
          </div>

          <div className='mb-3'>
            <label style={labelStyle}>Date Hired</label>
            <input
              style={inputFieldStyle}
              type='date'
              name='date_hired'
              value={employee.date_hired.substring(0, 10)}
              autoComplete='off'
              onChange={(e) => setEmployee({ ...employee, date_hired: e.target.value })}
              className='form-control'
              required
            />
          </div>

          <div className='mb-3'>
            <label style={labelStyle}>Pay Frequency</label>
            <select
              style={inputFieldStyle}
              name='pay_frequency'
              value={employee.pay_frequency}
              autoComplete='off'
              onChange={(e) => setEmployee({ ...employee, pay_frequency: e.target.value })}
              className='form-select'
              required
            >
              <option value="">Pay Frequency</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>

          <div className='mb-3'>
            <label style={labelStyle}>Daily Rate</label>
            <input
              style={inputFieldStyle}
              type="int"
              name='rate_per_day'
              value={employee.rate_per_day}
              autoComplete='off'
              onChange={(e) => setEmployee({ ...employee, rate_per_day: e.target.value })}
              className='form-control'
              required
            />
          </div>

          <div className='mb-3'>
            <label style={labelStyle}>Hourly Rate</label>
            <input
              style={inputFieldStyle}
              type="int"
              name='rate_per_hour'
              value={employee.rate_per_hour}
              autoComplete='off'
              onChange={(e) => setEmployee({ ...employee, rate_per_hour: e.target.value })}
              className='form-control'
              required
            />
          </div>

          <div className='mb-3'>
            <label style={labelStyle}>Employee Status</label>
            <select
              style={inputFieldStyle}
              name='employee_status'
              value={employee.employee_status}
              autoComplete='off'
              onChange={(e) => setEmployee({ ...employee, employee_status: e.target.value })}
              className='form-select'
              required
            >
              <option value="">Employee Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className='mb-3'>
            <label style={labelStyle}>Department</label>
            <select
              style={inputFieldStyle}
              name='department'
              value={employee.department}
              autoComplete='off'
              onChange={(e) => setEmployee({ ...employee, department: e.target.value })}
              className='form-select'
              required
            >
              <option value="">Department</option>
              {department.map((dep) => (
                <option key={dep.id} value={dep.name}>
                  {dep.name}
                </option>
              ))}
            </select>
          </div>

          <div className='mb-3'>
            <label style={labelStyle}>Project/Unit</label>
            <select
              style={inputFieldStyle}
              name='project'
              value={employee.project}
              autoComplete='off'
              onChange={(e) => setEmployee({ ...employee, project: e.target.value })}
              className='form-select'
              required
            >
              <option value="">Project/Unit</option>
              {project.map((proj) => (
                <option key={proj.id} value={proj.name}>
                  {proj.name}
                </option>
              ))}
            </select>
          </div>

          <div className='mb-3'>
            <label style={labelStyle}>Position</label>
            <select
              style={inputFieldStyle}
              name='position'
              value={employee.position}
              autoComplete='off'
              onChange={(e) => setEmployee({ ...employee, position: e.target.value })}
              className='form-select'
              required
            >
              <option value="">Position</option>
              {position.map((pos) => (
                <option key={pos.id} value={pos.name}>
                  {pos.name}
                </option>
              ))}
            </select>
          </div>

          <div className='mb-3'>
            <label style={labelStyle}>Salary</label>
            <input
              style={inputFieldStyle}
              type="int"
              name='salary'
              value={employee.salary}
              autoComplete='off'
              onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
              className='form-control'
              required
            />
          </div>

          <div className='mb-3'>
            <label style={labelStyle}>Start Time</label>
            <input
              style={inputFieldStyle}
              type='time'
              name='start_time'
              value={employee.start_time}
              autoComplete='off'
              onChange={(e) => setEmployee({ ...employee, start_time: e.target.value })}
              className='form-control'
              required
            />
          </div>

          <div className='mb-3'>
            <label style={labelStyle}>Out Time</label>
            <input
              style={inputFieldStyle}
              type='time'
              name='out_time'
              value={employee.out_time}
              autoComplete='off'
              onChange={(e) => setEmployee({ ...employee, out_time: e.target.value })}
              className='form-control'
              required
            />
          </div>

          <div className='mb-3'>
            <button type='submit' className='btn btn-primary w-100' style={{ fontSize: '22px', fontFamily: 'Montserrat', backgroundColor: '#0b283b', border: 'none' }}>
              Edit Employee
            </button>
          </div>

          <div className='mb-3'>
            <button type='reset' className='btn btn-outline-secondary w-100' style={{ fontSize: '22px', fontFamily: 'Montserrat' }}>
              Reset
            </button>
          </div>
        </form>
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
    </div>
  );
};

const labelStyle = {
  fontSize: '20px',
  fontFamily: 'Montserrat',
  color: '#0b283b',
  fontWeight: 'bold',
  display: 'block',
  marginBottom: '5px'
};

const inputFieldStyle = {
  fontSize: '20px',
  fontFamily: 'Montserrat',
};

export default EditEmployee;
