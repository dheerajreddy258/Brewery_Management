import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/RegisterPage.css';
import userService from '../services/UserService';

export default function RegisterPage() {
    const Navigate = useNavigate();
    const [data, setData] = useState({ userName: '', userEmail: '', password: '' });
    const [message, setMessage] = useState('');
    const [display, setDisplay] = useState(false);

    const handleSubmit = async (e) => {
        setDisplay(true);
        e.preventDefault();
        try {
            const response = await userService.register(data.userName, data.userEmail, data.password);
            const status = response.status;
            setMessage(response.data);
            if (status) {
                setTimeout(() => {
                    setDisplay(false);
                    Navigate('/login');
                }, 2000);
            }
        } catch (err) {
            setMessage(err.response.data);
            console.log(err.response.data);
        }
        setTimeout(() => {
            setDisplay(false);
        }, 2000);
    };

    return (
        <div className="register-page">
            <div className="register-form">
                <p className="register-txt">Register</p>
                <form action="">
                    <div className="form-component">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={data.userName}
                            onChange={(e) => setData({ ...data, userName: e.target.value })}
                            placeholder="Enter Username"
                            required
                        />
                    </div>
                    <div className="form-component">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={data.userEmail}
                            onChange={(e) => setData({ ...data, userEmail: e.target.value })}
                            placeholder="Enter Email"
                            required
                        />
                    </div>
                    <div className="form-component">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter Password"
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                            required
                        />
                    </div>
                    <div className="btn-container">
                        <button type="submit" onClick={handleSubmit}>
                            Register
                        </button>
                    </div>
                    {display && <div className="loader">{message}</div>}
                </form>
                <div className="existing-user">
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
}
