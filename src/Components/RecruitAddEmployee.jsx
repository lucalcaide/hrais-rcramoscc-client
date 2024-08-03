import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RecruitAddEmployee = () => {
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
    password: "",
    salary: "",
    start_time: "",
    out_time: "",
    image: null,
    resume: null,
    job_offer: null,
    contract: null,
    valid_id: null,
    application_form: null,
    disciplinary_form: null,
  });

  const [department, setDepartment] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://hrais-rcramoscc-server.onrender.com/auth/department")
      .then((result) => {
        if (result.data.Status) {
          setDepartment(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const [project, setProject] = useState([]);

  useEffect(() => {
    axios
      .get("https://hrais-rcramoscc-server.onrender.com/auth/project")
      .then((result) => {
        if (result.data.Status) {
          setProject(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const [position, setPosition] = useState([]);

  useEffect(() => {
    axios
      .get("https://hrais-rcramoscc-server.onrender.com/auth/position")
      .then((result) => {
        if (result.data.Status) {
          setPosition(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("emp_no", employee.emp_no);
    formData.append("fname", employee.fname);
    formData.append("mname", employee.mname);
    formData.append("lname", employee.lname);
    formData.append("gender", employee.gender);
    formData.append("birth_date", employee.birth_date);
    formData.append("phone_number", employee.phone_number);
    formData.append("perma_address", employee.perma_address);
    formData.append("emergency_name", employee.emergency_name);
    formData.append("emergency_relationship", employee.emergency_relationship);
    formData.append("emergency_phone_number", employee.emergency_phone_number);
    formData.append("date_hired", employee.date_hired);
    formData.append("pay_frequency", employee.pay_frequency);
    formData.append("rate_per_day", employee.rate_per_day);
    formData.append("rate_per_hour", employee.rate_per_hour);
    formData.append("employee_status", employee.employee_status);
    formData.append("department", employee.department);
    formData.append("project", employee.project);
    formData.append("position", employee.position);
    formData.append("email", employee.email);
    formData.append("password", employee.password);
    formData.append("salary", employee.salary);
    formData.append("start_time", employee.start_time);
    formData.append("out_time", employee.out_time);

    if (employee.image) {
      formData.append("image", employee.image);
    }
    if (employee.resume) {
      formData.append("resume", employee.resume);
    }
    if (employee.job_offer) {
      formData.append("job_offer", employee.job_offer);
    }
    if (employee.contract) {
      formData.append("contract", employee.contract);
    }
    if (employee.valid_id) {
      formData.append("valid_id", employee.valid_id);
    }
    if (employee.application_form) {
      formData.append("application_form", employee.application_form);
    }
    if (employee.disciplinary_form) {
      formData.append("disciplinary_form", employee.disciplinary_form);
    }

    axios.post("https://hrais-rcramoscc-server.onrender.com/auth/add_employee", formData)
      .then((result) => {
        if (result.data.Status) {
          const { fname, mname, lname } = employee;
          toast.success(`Employee '${fname} ${mname ? mname + ' ' : ''}${lname}' added successfully!`);
          setTimeout(() => {
            navigate('/dashboard/employee'); // Redirect to the dashboard after creation
          }, 1000); // Delay for 1 seconds
        } else {
          console.error(result.data.Error);
          toast.error(result.data.Error);
        }
      })
      .catch((err) => {
        console.error('An error occurred while adding the employee:', err);
        toast.error('An error occurred while adding the employee.');
      });
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
      password: "",
      salary: "",
      start_time: "",
      out_time: "",
      image: null,
      resume: null,
      job_offer: null,
      contract: null,
      valid_id: null,
      application_form: null,
      disciplinary_form: null,
    });
  };

  const handleBack = () => {
    navigate("/dashboard/employee");
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='card p-5 shadow-sm custom-shadow' style={{ maxWidth: '800px', width: '100%' }}>
        <div className="text-center mb-4">
          <h2 className='mt-3 mb-3 ' style={{ fontSize: '28px', fontWeight: 'bold', fontFamily: 'Montserrat', color: '#0b283b' }}>ADD EMPLOYEE</h2>
          <p style={{ fontSize: '20px', fontFamily: 'Montserrat', color: '#666' }}>
            Fill in the details below to add a new <span style={{ fontWeight: 'bold' }}>employee</span>.
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
              placeholder='ID Number'
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
              placeholder='First Name'
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
              placeholder='Middle Name'
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
              placeholder='Last Name'
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
              placeholder='Phone Number'
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
              placeholder='Permanent Address'
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
              placeholder='Email'
              autoComplete='off'
              onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
              className='form-control'
              required
            />
          </div>

          <div className='mb-3'>
            <label style={labelStyle}>Password</label>
            <input
              style={inputFieldStyle}
              type='password'
              name='password'
              placeholder='Password'
              autoComplete='off'
              onChange={(e) => setEmployee({ ...employee, password: e.target.value })}
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
              placeholder='Emergency Contact Name'
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
              placeholder='Relationship'
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
              placeholder='Contact Number'
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
            <label style={labelStyle}>Image</label>
            <input
              style={inputFieldStyle}
              type='file'
              name='image'
              autoComplete='off'
              onChange={(e) => setEmployee({ ...employee, image: e.target.files[0] })}
              className='form-control'
              required
            />
          </div>

          <div className='mb-3'>
            <label style={labelStyle}>Date Hired</label>
            <input
              style={inputFieldStyle}
              type='date'
              name='date_hired'
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
              placeholder='Daily Rate'
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
              placeholder='Hourly Rate'
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
              placeholder='Salary'
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
              autoComplete='off'
              onChange={(e) => setEmployee({ ...employee, out_time: e.target.value })}
              className='form-control'
              required
            />
          </div>

          <div className='text-center mb-3'>
            <span className="mb-3" style={{ fontSize: '25px', fontFamily: 'Montserrat', fontWeight: 'bold', color: '#0b283b' }}>
              201 Files
            </span>
          </div>

          <div className='mb-3'>
            <label style={labelStyle}>Resume</label>
            <input
              style={inputFieldStyle}
              type='file'
              name='resume'
              autoComplete='off'
              onChange={(e) => setEmployee({ ...employee, resume: e.target.files[0] })}
              className='form-control'
              required
            />
          </div>

          <div className='mb-3'>
            <label style={labelStyle}>Job Offer</label>
            <input
              style={inputFieldStyle}
              type='file'
              name='job_offer'
              autoComplete='off'
              onChange={(e) => setEmployee({ ...employee, job_offer: e.target.files[0] })}
              className='form-control'
              required
            />
          </div>

          <div className='mb-3'>
            <label style={labelStyle}>Contract</label>
            <input
              style={inputFieldStyle}
              type='file'
              name='contract'
              autoComplete='off'
              onChange={(e) => setEmployee({ ...employee, contract: e.target.files[0] })}
              className='form-control'
              required
            />
          </div>

          <div className='mb-3'>
            <label style={labelStyle}>Valid ID</label>
            <input
              style={inputFieldStyle}
              type='file'
              name='valid_id'
              autoComplete='off'
              onChange={(e) => setEmployee({ ...employee, valid_id: e.target.files[0] })}
              className='form-control'
              required
            />
          </div>

          <div className='mb-3'>
            <label style={labelStyle}>Application Form</label>
            <input
              style={inputFieldStyle}
              type='file'
              name='application_form'
              autoComplete='off'
              onChange={(e) => setEmployee({ ...employee, application_form: e.target.files[0] })}
              className='form-control'
              required
            />
          </div>

          <div className='mb-3'>
            <label style={labelStyle}>Disciplinary Form</label>
            <input
              style={inputFieldStyle}
              type='file'
              name='disciplinary_form'
              autoComplete='off'
              onChange={(e) => setEmployee({ ...employee, disciplinary_form: e.target.files[0] })}
              className='form-control'
              required
            />
          </div>

          <div className='mb-3'>
            <button type='submit' className='btn btn-primary w-100' style={{ fontSize: '22px', fontFamily: 'Montserrat', backgroundColor: '#0b283b', border: 'none',color:'wheat' }}>
              Add Employee
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

export default RecruitAddEmployee
