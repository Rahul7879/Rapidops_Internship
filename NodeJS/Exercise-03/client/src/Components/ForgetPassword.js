import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/forgot-password', { email });
            console.log('Reset password link sent:', response.data);
            alert('Please check your email to reset your password!');
            navigate("/login");
        } catch (error) {
            console.error('Failed to send reset link:', error.response || error);
            alert('Failed to send reset link. Please try again.');
        }
    };

    return (
        <div style={{ alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f8f9fa' }} className='div-contain'>
            <img src="https://accounts.salesmate.io/assets/images/logo-dark.png" alt='logo image' width={300} className='mx-auto d-block' style={{ marginBottom: '20px' }} />
            <div className='container bg-white p-5' style={{ width: '100%', maxWidth: '400px' }}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="email"
                            placeholder='Enter your email'
                            name="email"
                            value={email}
                            onChange={handleChange}
                            className="form-control"
                            id="emailInput"
                            aria-describedby="emailHelp"
                            required />
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary w-100">Send Reset Link</button>
                    </div>
                </form>
                <div className="link-container text-center mt-3">
                    <small>Remember your password?
                        <Link to="/login" style={{ textDecoration: "none", marginLeft: "4px" }}>Log in</Link>
                    </small>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
