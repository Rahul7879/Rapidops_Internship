import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../assets/Group.svg';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = ({isUserAuthenticated}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(()=>{
         isUserAuthenticated(true);
    },[isUserAuthenticated])

    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
        return re.test(email);
    };

    const validateForm = () => {
        if (!validateEmail(email)) {
            toast.error("Please enter a valid email address.");
            return false;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return false;
        }
        return true;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateForm()) return;

        axios.defaults.withCredentials = true;
        axios.post('http://localhost:5000/login', {
            email: email,
            password: password,
        }).then((res) => {
                isUserAuthenticated(true);
                navigate('/dashboard');
                localStorage.setItem("email", email);
                toast.success("Login successful");
        }).catch((err) => {
            console.log(err.response.status);
            if (err.response.status === 404) {
                toast.error("Account not Found");
            } else{
                toast.warn("Wrong password");
            }
        });
    }

    return (
        <div className='container my-5 '>
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-8">
                    <div className="d-flex justify-content-center text-center mb-4 py-3">
                        <img src={logo} className='img-fluid logo' alt="" />
                        <h1>Rapid Page Builder</h1>
                    </div>
                    <form className='px-5 grey-border' onSubmit={handleSubmit}>
                    <h3 className='my-5 fs-2 '>Login</h3>
                        <div>
                            <label htmlFor="emailInput" className="form-label">Username or email address <span className='text-danger'>*</span></label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" placeholder='Enter your email address' />
                        </div>
                        <div className="my-3">
                            <label htmlFor="passwordInput" className="form-label">Password <span className='text-danger'>*</span></label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="passwordInput" autoComplete="on" placeholder='Enter password' />
                        </div>
                        <div className="mt-3">
                            <button type="submit" className="btn primary-bg-color text-white my-4">Login</button>
                            <Link to="/signup"><button type="button" className='btn primary-color my-4'>Don't have an account?</button></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
