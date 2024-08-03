import React, { Suspense } from 'react'; // Ensure React is imported
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Lazy load MyComponent
const MyComponent = React.lazy(() => import('./Components/MyComponent'));
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login  />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path="/employee_home/:id" element={<PrivateRoute roles={['employee']}><EmployeeHome /></PrivateRoute>} />
        <Route path="/employee_profile/:id" element={<PrivateRoute> roles={['employee']}<EmployeeProfile /></PrivateRoute>} />
        <Route path="/employee_change_password/:id" element={<PrivateRoute roles={['employee']}><EmpChangePass /></PrivateRoute>} />
        <Route path="/employee_files/:id" element={<PrivateRoute roles={['employee']}><EmployeeFiles /></PrivateRoute>} />
        <Route path='/employee_attendance/:id' element={<PrivateRoute roles={['employee']}><EmployeeAttendance /></PrivateRoute>} />
        <Route path='/employee_attendance-fulldetails/:id' element={<PrivateRoute roles={['employee']}><EmployeeAttendanceFullDetails /></PrivateRoute>} />
        <Route path="/employee_leave/:id" element={<PrivateRoute roles={['employee']}><EmployeeLeave /></PrivateRoute>} />
        <Route path="/employee_leave_list/:id" element={<PrivateRoute roles={['employee']}><EmployeeLeaveRequest /></PrivateRoute>} />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route path='' element={<PrivateRoute roles={['admin']}><Home /></PrivateRoute>} />
          <Route path='/dashboard/createadmin' element={<PrivateRoute roles={['admin']}><CreateAdmin /></PrivateRoute>} />
          <Route path='/dashboard/createrecruitment' element={<PrivateRoute roles={['admin']}><CreateRecruitment /></PrivateRoute>} />
          <Route path='/dashboard/createpayroll' element={<PrivateRoute roles={['admin']}><CreatePayroll /></PrivateRoute>} />
          <Route path='/dashboard/employee' element={<PrivateRoute roles={['admin']}><Employee /></PrivateRoute>} />
          <Route path='/dashboard/employee/update_employee_password/:id' element={<PrivateRoute roles={['admin']}><CreateNewPass /></PrivateRoute>} />
          <Route path='/dashboard/department' element={<PrivateRoute roles={['admin']}><Department /></PrivateRoute>} />
          <Route path='/dashboard/project' element={<PrivateRoute roles={['admin']}><Project /></PrivateRoute>} />
          <Route path='/dashboard/position' element={<PrivateRoute roles={['admin']}><Position /></PrivateRoute>} />
          <Route path='/dashboard/attendance' element={<PrivateRoute roles={['admin']}><Attendance /></PrivateRoute>} />
          <Route path='/dashboard/manage_attendance' element={<PrivateRoute roles={['admin']}><ManageAttendance/></PrivateRoute>} />
          <Route path='/dashboard/attendance-fulldetails' element={<PrivateRoute roles={['admin']}><AttendanceFullDetails/></PrivateRoute>} />
          <Route path='/dashboard/leave' element={<PrivateRoute roles={['admin']}><Leave /></PrivateRoute>} />
          <Route path='/dashboard/terms_and_agreements' element={<PrivateRoute roles={['admin']}><TermsAndAgreements /></PrivateRoute>} />
          <Route path='/dashboard/about_us' element={<PrivateRoute roles={['admin']}><AboutUs /></PrivateRoute>} />
          <Route path='/dashboard/201files' element={<PrivateRoute roles={['admin']}><Files /></PrivateRoute>} />
          <Route path='/dashboard/201files/resume' element={<PrivateRoute roles={['admin']}><FilesResume /></PrivateRoute>} />
          <Route path='/dashboard/201files/job_offer' element={<PrivateRoute roles={['admin']}><FilesJobOffer /></PrivateRoute>} />
          <Route path='/dashboard/201files/contract' element={<PrivateRoute roles={['admin']}><FilesContract /></PrivateRoute>} />
          <Route path='/dashboard/201files/valid_id' element={<PrivateRoute roles={['admin']}><FilesValidId /></PrivateRoute>} />
          <Route path='/dashboard/201files/application_form' element={<PrivateRoute roles={['admin']}><FilesApplicationForm /></PrivateRoute>} />
          <Route path='/dashboard/201files/disciplinary_form' element={<PrivateRoute roles={['admin']}><FilesDisciplinaryForm /></PrivateRoute>} />
          <Route path='/dashboard/add_dept' element={<PrivateRoute roles={['admin']}><AddDept /></PrivateRoute>} />
          <Route path='/dashboard/add_project' element={<PrivateRoute roles={['admin']}><AddProject /></PrivateRoute>} />
          <Route path='/dashboard/add_position' element={<PrivateRoute roles={['admin']}><AddPosition /></PrivateRoute>} />
          <Route path='/dashboard/add_employee' element={<PrivateRoute roles={['admin']}><AddEmployee /></PrivateRoute>} />
          <Route path='/dashboard/edit_employee/:id' element={<PrivateRoute roles={['admin']}><EditEmployee /></PrivateRoute>} />
          <Route path='/dashboard/view_employee/:id' element={<PrivateRoute roles={['admin']}><ViewEmployee /></PrivateRoute>} />
        </Route>

        <Route path="/recruitmentdashboard" element={<PrivateRoute roles={['recruitment']}><RecruitmentDashboard /></PrivateRoute>}>
          <Route path='' element={<PrivateRoute roles={['recruitment']}><RecruitmentHome /></PrivateRoute>} />
          <Route path='/recruitmentdashboard/employee' element={<PrivateRoute roles={['recruitment']}><RecruitEmployee /></PrivateRoute>} />
          <Route path='/recruitmentdashboard/add_employee' element={<PrivateRoute roles={['recruitment']}><RecruitAddEmployee /></PrivateRoute>} />
          <Route path='/recruitmentdashboard/edit_employee/:id' element={<PrivateRoute roles={['recruitment']}><RecruitEditEmployee /></PrivateRoute>} />
          <Route path='/recruitmentdashboard/view_employee/:id' element={<PrivateRoute roles={['recruitment']}><RecruitViewEmployee /></PrivateRoute>} />
          <Route path='/recruitmentdashboard/201files' element={<PrivateRoute roles={['recruitment']}><RecruitFiles /></PrivateRoute>} />
          <Route path='/recruitmentdashboard/201files/resume' element={<PrivateRoute roles={['recruitment']}><RecruitFilesResume /></PrivateRoute>} />
          <Route path='/recruitmentdashboard/201files/job_offer' element={<PrivateRoute roles={['recruitment']}><RecruitFilesJobOffer /></PrivateRoute>} />
          <Route path='/recruitmentdashboard/201files/contract' element={<PrivateRoute roles={['recruitment']}><RecruitFilesContracts /></PrivateRoute>} />
          <Route path='/recruitmentdashboard/201files/valid_id' element={<PrivateRoute roles={['recruitment']}><RecruitFilesValidId /></PrivateRoute>} />
          <Route path='/recruitmentdashboard/201files/application_form' element={<PrivateRoute roles={['recruitment']}><RecruitFilesApplicationForm /></PrivateRoute>} />
          <Route path='/recruitmentdashboard/201files/disciplinary_form' element={<PrivateRoute roles={['recruitment']}><RecruitFilesDisciplinaryForm /></PrivateRoute>} />
          <Route path='/recruitmentdashboard/terms_and_agreements' element={<PrivateRoute roles={['recruitment']}><RecruitTermsAndAgreements /></PrivateRoute>} />
          <Route path='/recruitmentdashboard/about_us' element={<PrivateRoute roles={['recruitment']}><RecruitAboutUs /></PrivateRoute>} />
        </Route>

        <Route path="/payrolldashboard" element={<PrivateRoute roles={['payroll']}><PayrollDashboard /></PrivateRoute>}>
          <Route path='' element={<PrivateRoute roles={['payroll']}><PayrollHome /></PrivateRoute>} />
          <Route path='/payrolldashboard/leave' element={<PrivateRoute roles={['payroll']}><PayrollLeave /></PrivateRoute>} />
          <Route path='/payrolldashboard/attendance' element={<PrivateRoute roles={['payroll']}><PayrollAttendance /></PrivateRoute>} />
          <Route path='/payrolldashboard/manage_attendance' element={<PrivateRoute roles={['payroll']}><PayrollManageAttendance /></PrivateRoute>} />
          <Route path='/payrolldashboard/attendance-fulldetails' element={<PrivateRoute roles={['payroll']}><PayrollAttendanceFullDetails /></PrivateRoute>} />
          <Route path='/payrolldashboard/terms_and_agreements' element={<PrivateRoute roles={['payroll']}><PayrollTermsAndAgreements /></PrivateRoute>} />
          <Route path='/payrolldashboard/about_us' element={<PrivateRoute roles={['payroll']}><PayrollAboutUs /></PrivateRoute>} />
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
