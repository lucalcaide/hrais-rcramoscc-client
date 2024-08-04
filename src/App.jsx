import React, { Suspense } from 'react'; // Ensure React is imported
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Lazy load MyComponent
const MyComponent = React.lazy(() => import('./Components/MyComponent'));
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import CreateAdmin from './Components/CreateAdmin';
import CreateRecruitment from './Components/CreateRecruitment';
import CreatePayroll from './Components/CreatePayroll';
import Employee from './Components/Employee';
import Department from './Components/Department';
import Project from './Components/Project';
import Position from './Components/Position';
import Attendance from './Components/Attendance';

import Leave from './Components/Leave';
import TermsAndAgreements from './Components/TermsAndAgreements';
import AboutUs from './Components/AboutUs';
import Files from './Components/Files';
import FilesResume from './Components/FilesResume';
import FilesJobOffer from './Components/FilesJobOffer';
import FilesContract from './Components/FilesContract';
import FilesValidId from './Components/FilesValidId';
import FilesApplicationForm from './Components/FilesApplicationForm';
import FilesDisciplinaryForm from './Components/FilesDisciplinaryForm';
import AddDept from './Components/AddDept';
import AddPosition from './Components/AddPosition';
import AddEmployee from './Components/AddEmployee';
import EditEmployee from './Components/EditEmployee';
import ViewEmployee from './Components/ViewEmployee';
import AddProject from './Components/AddProject';

import RecruitmentDashboard from './Components/RecruitmentDashboard';
import RecruitmentHome from './Components/RecruitmentHome';
import RecruitEmployee from './Components/RecruitEmployee';
import RecruitAddEmployee from './Components/RecruitAddEmployee';
import RecruitEditEmployee from './Components/RecruitEditEmployee';
import EmployeeProfile from './Components/EmployeeProfile';
import EmployeeHome from './Components/EmployeeHome';
import EmployeeFiles from './Components/EmployeeFiles';
import EmpChangePass from './Components/EmpChangePass';
import EmployeeLeave from './Components/EmployeeLeave';
import EmployeeLeaveRequest from './Components/EmployeeLeaveRequest';
import EmployeeAttendance from './Components/EmployeeAttendance';
import EmployeeAttendanceFullDetails from './Components/EmployeeAttendanceFullDetails';

import CreateNewPass from './Components/CreateNewPass';
import RecruitViewEmployee from './Components/RecruitViewEmployee';
import RecruitFiles from './Components/RecruitFiles';
import RecruitFilesResume from './Components/RecruitFilesResume';
import RecruitFilesJobOffer from './Components/RecruitFilesJobOffer';
import RecruitFilesContracts from './Components/RecruitFilesContracts';
import RecruitFilesValidId from './Components/RecruitFilesValidId';
import RecruitFilesApplicationForm from './Components/RecruitFilesApplicationForm';
import RecruitFilesDisciplinaryForm from './Components/RecruitFilesDisciplinaryForm';
import RecruitTermsAndAgreements from './Components/RecruitTermsAndAgreements';
import RecruitAboutUs from './Components/RecruitAboutUs';
import PayrollDashboard from './Components/PayrollDashboard';
import PayrollHome from './Components/PayrollHome';
import PayrollAttendance from './Components/PayrollAttendance';
import PayrollLeave from './Components/PayrollLeave';
import PayrollManageAttendance from './Components/PayrollManageAttendance';
import PayrollAttendanceFullDetails from './Components/PayrollAttendanceFullDetails';

import PayrollTermsAndAgreements from './Components/PayrollTermsAndAgreements';
import PayrollAboutUs from './Components/PayrollAboutUs';
import Unauthorized from './Components/Unauthorized';
import ManageAttendance from './Components/ManageAttendance';
import AttendanceFullDetails from './Components/AttendanceFullDetails';
import VerifyToken from './Components/VerifyToken';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login  />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* Token verification route */}
        <Route path="/verify_token" element={<VerifyToken />} />

        <Route path="/employee_home/:id" element={<PrivateRoute roles={['employee']}><EmployeeHome /></PrivateRoute>} />
        <Route path="/employee_profile/:id" element={<PrivateRoute roles={['employee']}><EmployeeProfile /></PrivateRoute>} />
        <Route path="/employee_change_password/:id" element={<PrivateRoute roles={['employee']}><EmpChangePass /></PrivateRoute>} />
        <Route path="/employee_files/:id" element={<PrivateRoute roles={['employee']}><EmployeeFiles /></PrivateRoute>} />
        <Route path='/employee_attendance/:id' element={<PrivateRoute roles={['employee']}><EmployeeAttendance /></PrivateRoute>} />
        <Route path='/employee_attendance-fulldetails/:id' element={<PrivateRoute roles={['employee']}><EmployeeAttendanceFullDetails /></PrivateRoute>} />
        <Route path="/employee_leave/:id" element={<PrivateRoute roles={['employee']}><EmployeeLeave /></PrivateRoute>} />
        <Route path="/employee_leave_list/:id" element={<PrivateRoute roles={['employee']}><EmployeeLeaveRequest /></PrivateRoute>} />

        <Route path="/dashboard" element={<PrivateRoute roles={['admin']}><Dashboard /></PrivateRoute>}>
          <Route path='' element={<Home />} />
          <Route path='/dashboard/createadmin' element={<CreateAdmin />} />
          <Route path='/dashboard/createrecruitment' element={<CreateRecruitment />} />
          <Route path='/dashboard/createpayroll' element={<CreatePayroll />} />
          <Route path='/dashboard/employee' element={<Employee />} />
          <Route path='/dashboard/employee/update_employee_password/:id' element={<CreateNewPass />} />
          <Route path='/dashboard/department' element={<Department />} />
          <Route path='/dashboard/project' element={<Project />} />
          <Route path='/dashboard/position' element={<Position />} />
          <Route path='/dashboard/attendance' element={<Attendance />} />
          <Route path='/dashboard/manage_attendance' element={<ManageAttendance/>} />
          <Route path='/dashboard/attendance-fulldetails' element={<AttendanceFullDetails/>} />
          <Route path='/dashboard/leave' element={<Leave />} />
          <Route path='/dashboard/terms_and_agreements' element={<TermsAndAgreements />} />
          <Route path='/dashboard/about_us' element={<AboutUs />} />
          <Route path='/dashboard/201files' element={<Files />} />
          <Route path='/dashboard/201files/resume' element={<FilesResume />} />
          <Route path='/dashboard/201files/job_offer' element={<FilesJobOffer />} />
          <Route path='/dashboard/201files/contract' element={<FilesContract />} />
          <Route path='/dashboard/201files/valid_id' element={<FilesValidId />} />
          <Route path='/dashboard/201files/application_form' element={<FilesApplicationForm />} />
          <Route path='/dashboard/201files/disciplinary_form' element={<FilesDisciplinaryForm />} />
          <Route path='/dashboard/add_dept' element={<AddDept />} />
          <Route path='/dashboard/add_project' element={<AddProject />}/>
          <Route path='/dashboard/add_position' element={<AddPosition />} />
          <Route path='/dashboard/add_employee' element={<AddEmployee />} />
          <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />} />
          <Route path='/dashboard/view_employee/:id' element={<ViewEmployee />} />
        </Route>

        <Route path="/recruitmentdashboard" element={<PrivateRoute roles={['recruitment']}><RecruitmentDashboard /></PrivateRoute>}>
          <Route path='' element={<RecruitmentHome />} />
          <Route path='/recruitmentdashboard/employee' element={<RecruitEmployee />} />
          <Route path='/recruitmentdashboard/add_employee' element={<RecruitAddEmployee />} />
          <Route path='/recruitmentdashboard/edit_employee/:id' element={<RecruitEditEmployee />} />
          <Route path='/recruitmentdashboard/view_employee/:id' element={<RecruitViewEmployee />} />
          <Route path='/recruitmentdashboard/201files' element={<RecruitFiles />} />
          <Route path='/recruitmentdashboard/201files/resume' element={<RecruitFilesResume />} />
          <Route path='/recruitmentdashboard/201files/job_offer' element={<RecruitFilesJobOffer />} />
          <Route path='/recruitmentdashboard/201files/contract' element={<RecruitFilesContracts />} />
          <Route path='/recruitmentdashboard/201files/valid_id' element={<RecruitFilesValidId />} />
          <Route path='/recruitmentdashboard/201files/application_form' element={<RecruitFilesApplicationForm />} />
          <Route path='/recruitmentdashboard/201files/disciplinary_form' element={<RecruitFilesDisciplinaryForm />} />
          <Route path='/recruitmentdashboard/terms_and_agreements' element={<RecruitTermsAndAgreements />} />
          <Route path='/recruitmentdashboard/about_us' element={<RecruitAboutUs />} />
        </Route>

        <Route path="/payrolldashboard" element={<PrivateRoute roles={['payroll']}><PayrollDashboard /></PrivateRoute>}>
          <Route path='' element={<PayrollHome />} />
          <Route path='/payrolldashboard/leave' element={<PayrollLeave />} />
          <Route path='/payrolldashboard/attendance' element={<PayrollAttendance />} />
          <Route path='/payrolldashboard/manage_attendance' element={<PayrollManageAttendance />} />
          <Route path='/payrolldashboard/attendance-fulldetails' element={<PayrollAttendanceFullDetails />} />
          <Route path='/payrolldashboard/terms_and_agreements' element={<PayrollTermsAndAgreements />} />
          <Route path='/payrolldashboard/about_us' element={<PayrollAboutUs />} />
        </Route>

        {/* Add a route to load MyComponent */}
        <Route path="/my_component" element={
          <Suspense fallback={<div>Loading...</div>}>
            <PrivateRoute roles={['admin', 'recruitment', 'payroll', 'employee']}><MyComponent /></PrivateRoute>
          </Suspense>
        } />

      </Routes>
    </BrowserRouter>
  )
}

export default App;
