import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";

const EmpChangePass = () => {
    const [employee, setEmployee] = useState({});
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/employee/detail/${id}`)
            .then(result => {
                setEmployee(result.data[0]);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleLogout = () => {
        axios.get('http://localhost:3000/employee/logout')
            .then(result => {
                if (result.data.Status) {
                    localStorage.removeItem("valid");
                    navigate('/employeelogin');
                }
            }).catch(err => console.log(err));
    };

    const handleChangePassword = (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setErrorMessage("New password and Confirmation password must match.");
            setSuccessMessage('');
            return;
        }

        axios.post(`http://localhost:3000/employee/change-password/${id}`, {
            currentPassword,
            newPassword
        }).then(response => {
            if (response.data.success) {
                setSuccessMessage("Your password was updated successfully.");
                setErrorMessage('');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                setErrorMessage("Failed to change password.");
                setSuccessMessage('');
            }
        }).catch(err => {
            setErrorMessage("Your current password is incorrect.");
            setSuccessMessage('');
        });
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className='card p-5 shadow-sm custom-shadow' style={{ maxWidth: '600px', width: '100%' }}>
                <h2 className='text-center mb-4' style={{ fontSize: '28px', fontWeight: 'bold', fontFamily: 'Montserrat', color: '#0b283b' }}>Change Password</h2>
                <form onSubmit={handleChangePassword} onReset={() => { 
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                }}>
                    <div className='mb-3'>
                        <label htmlFor="currentPassword" style={{ fontSize: '20px', fontFamily: 'Montserrat', color: '#0b283b', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Current Password</label>
                        <input
                            id="currentPassword"
                            style={{ fontSize: '22px', fontFamily: 'Montserrat' }}
                            type="password"
                            className="form-control"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="newPassword" style={{ fontSize: '20px', fontFamily: 'Montserrat', color: '#0b283b', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>New Password</label>
                        <input
                            id="newPassword"
                            style={{ fontSize: '22px', fontFamily: 'Montserrat' }}
                            type="password"
                            className="form-control"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="confirmPassword" style={{ fontSize: '20px', fontFamily: 'Montserrat', color: '#0b283b', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Confirm New Password</label>
                        <input
                            id="confirmPassword"
                            style={{ fontSize: '22px', fontFamily: 'Montserrat' }}
                            type="password"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    {errorMessage && <div className="alert alert-danger" role="alert" style={{ fontFamily: 'Montserrat', fontWeight: 'bold' }}>{errorMessage}</div>}
                    {successMessage && <div className="alert alert-success" role="alert" style={{ fontFamily: 'Montserrat', fontWeight: 'bold' }}>{successMessage}</div>}

                    <button className='btn btn-primary w-100' style={{ fontSize: '22px', fontFamily: 'Montserrat', backgroundColor: '#0b283b', border: 'none', color: 'white' }}>Submit Password</button>
                    <div className='text-center mt-4'>
                        <Link to={`/employee_profile/${id}`} className='btn btn-link' style={{ fontSize: '18px', fontFamily: 'Montserrat', color: '#0b283b', textDecoration: 'none' }}>
                            Return to Profile
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmpChangePass;
