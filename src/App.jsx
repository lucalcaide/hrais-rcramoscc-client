import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path="/employee_home/:id" element={<PrivateRoute><EmployeeHome /></PrivateRoute>} />
        <Route path="/employee_profile/:id" element={<PrivateRoute><EmployeeProfile /></PrivateRoute>} />
        <Route path="/employee_change_password/:id" element={<PrivateRoute><EmpChangePass /></PrivateRoute>} />
        <Route path="/employee_files/:id" element={<PrivateRoute><EmployeeFiles /></PrivateRoute>} />
        <Route path='/employee_attendance/:id' element={<PrivateRoute><EmployeeAttendance /></PrivateRoute>} />
        <Route path='/employee_attendance-fulldetails/:id' element={<PrivateRoute><EmployeeAttendanceFullDetails /></PrivateRoute>} />
        <Route path="/employee_leave/:id" element={<PrivateRoute><EmployeeLeave /></PrivateRoute>} />
        <Route path="/employee_leave_list/:id" element={<PrivateRoute><EmployeeLeaveRequest /></PrivateRoute>} />
        <Route path='/update_employee_password/:id' element={<PrivateRoute><CreateNewPass /></PrivateRoute>} />

        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
          <Route path='' element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path='/dashboard/createadmin' element={<PrivateRoute><CreateAdmin /></PrivateRoute>} />
          <Route path='/dashboard/createrecruitment' element={<PrivateRoute><CreateRecruitment /></PrivateRoute>} />
          <Route path='/dashboard/createpayroll' element={<PrivateRoute><CreatePayroll /></PrivateRoute>} />
          <Route path='/dashboard/employee' element={<PrivateRoute><Employee /></PrivateRoute>} />
          <Route path='/dashboard/employee/update_employee_password/:id' element={<PrivateRoute><CreateNewPass /></PrivateRoute>} />
          <Route path='/dashboard/department' element={<PrivateRoute><Department /></PrivateRoute>} />
          <Route path='/dashboard/project' element={<PrivateRoute><Project /></PrivateRoute>} />
          <Route path='/dashboard/position' element={<PrivateRoute><Position /></PrivateRoute>} />
          <Route path='/dashboard/attendance' element={<PrivateRoute><Attendance /></PrivateRoute>} />
          <Route path='/dashboard/manage_attendance' element={<PrivateRoute><ManageAttendance/></PrivateRoute>} />
          <Route path='/dashboard/attendance-fulldetails' element={<PrivateRoute><AttendanceFullDetails/></PrivateRoute>} />
        
          <Route path='/dashboard/leave' element={<PrivateRoute><Leave /></PrivateRoute>} />
          <Route path='/dashboard/terms_and_agreements' element={<PrivateRoute><TermsAndAgreements /></PrivateRoute>} />
          <Route path='/dashboard/about_us' element={<PrivateRoute><AboutUs /></PrivateRoute>} />
          <Route path='/dashboard/201files' element={<PrivateRoute><Files /></PrivateRoute>} />
          <Route path='/dashboard/201files/resume' element={<PrivateRoute><FilesResume /></PrivateRoute>} />
          <Route path='/dashboard/201files/job_offer' element={<PrivateRoute><FilesJobOffer /></PrivateRoute>} />
          <Route path='/dashboard/201files/contract' element={<PrivateRoute><FilesContract /></PrivateRoute>} />
          <Route path='/dashboard/201files/valid_id' element={<PrivateRoute><FilesValidId /></PrivateRoute>} />
          <Route path='/dashboard/201files/application_form' element={<PrivateRoute><FilesApplicationForm /></PrivateRoute>} />
          <Route path='/dashboard/201files/disciplinary_form' element={<PrivateRoute><FilesDisciplinaryForm /></PrivateRoute>} />
          <Route path='/dashboard/add_dept' element={<PrivateRoute><AddDept /></PrivateRoute>} />
          <Route path='/dashboard/add_project' element={<PrivateRoute><AddProject /></PrivateRoute>} />
          <Route path='/dashboard/add_position' element={<PrivateRoute><AddPosition /></PrivateRoute>} />
          <Route path='/dashboard/add_employee' element={<PrivateRoute><AddEmployee /></PrivateRoute>} />
          <Route path='/dashboard/edit_employee/:id' element={<PrivateRoute><EditEmployee /></PrivateRoute>} />
          <Route path='/dashboard/view_employee/:id' element={<PrivateRoute><ViewEmployee /></PrivateRoute>} />
        </Route>

        <Route path="/recruitmentdashboard" element={<PrivateRoute><RecruitmentDashboard /></PrivateRoute>}>
          <Route path='' element={<PrivateRoute><RecruitmentHome /></PrivateRoute>} />
          <Route path='/recruitmentdashboard/employee' element={<PrivateRoute><RecruitEmployee /></PrivateRoute>} />
          <Route path='/recruitmentdashboard/add_employee' element={<PrivateRoute><RecruitAddEmployee /></PrivateRoute>} />
          <Route path='/recruitmentdashboard/edit_employee/:id' element={<PrivateRoute><RecruitEditEmployee /></PrivateRoute>} />
          <Route path='/recruitmentdashboard/view_employee/:id' element={<PrivateRoute><RecruitViewEmployee /></PrivateRoute>} />
          <Route path='/recruitmentdashboard/201files' element={<PrivateRoute><RecruitFiles /></PrivateRoute>} />
          <Route path='/recruitmentdashboard/201files/resume' element={<PrivateRoute><RecruitFilesResume /></PrivateRoute>} />
          <Route path='/recruitmentdashboard/201files/job_offer' element={<PrivateRoute><RecruitFilesJobOffer /></PrivateRoute>} />
          <Route path='/recruitmentdashboard/201files/contract' element={<PrivateRoute><RecruitFilesContracts /></PrivateRoute>} />
          <Route path='/recruitmentdashboard/201files/valid_id' element={<PrivateRoute><RecruitFilesValidId /></PrivateRoute>} />
          <Route path='/recruitmentdashboard/201files/application_form' element={<PrivateRoute><RecruitFilesApplicationForm /></PrivateRoute>} />
          <Route path='/recruitmentdashboard/201files/disciplinary_form' element={<PrivateRoute><RecruitFilesDisciplinaryForm /></PrivateRoute>} />
          <Route path='/recruitmentdashboard/terms_and_agreements' element={<PrivateRoute><RecruitTermsAndAgreements /></PrivateRoute>} />
          <Route path='/recruitmentdashboard/about_us' element={<PrivateRoute><RecruitAboutUs /></PrivateRoute>} />
        </Route>

        <Route path="/payrolldashboard" element={<PrivateRoute><PayrollDashboard /></PrivateRoute>}>
          <Route path='' element={<PrivateRoute><PayrollHome /></PrivateRoute>} />
          <Route path='/payrolldashboard/leave' element={<PrivateRoute><PayrollLeave /></PrivateRoute>} />
          <Route path='/payrolldashboard/attendance' element={<PrivateRoute><PayrollAttendance /></PrivateRoute>} />
          <Route path='/payrolldashboard/manage_attendance' element={<PrivateRoute><PayrollManageAttendance /></PrivateRoute>} />
          <Route path='/payrolldashboard/attendance-fulldetails' element={<PrivateRoute><PayrollAttendanceFullDetails /></PrivateRoute>} />
          <Route path='/payrolldashboard/terms_and_agreements' element={<PrivateRoute><PayrollTermsAndAgreements /></PrivateRoute>} />
          <Route path='/payrolldashboard/about_us' element={<PrivateRoute><PayrollAboutUs /></PrivateRoute>} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App;
