import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/Group.svg';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newsletter, setNewsletter] = useState(false);

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
        return re.test(email);
    };

    const validateForm = () => {
        const trimmedName = name.trim();
        if (trimmedName.length < 3) {
            toast.error("Name must be at least 3 characters long.");
            return false;
        }
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

        axios.post('http://localhost:5000/signup', {
            name: name.trim(),
            email: email,
            password: password,
            newsletter: newsletter
        }).then((res) => {
            if (res.data.code !== 401) {
                setName("");
                setEmail("");
                setPassword("");
                toast.success("Signup Successfully");
            } else {
                toast.warn("User already Exists");
            }
        }).catch((err) => {
            toast.error("Error");
        });
    }

    return (
        <div className='container mt-5'>
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-8">
                    <div className="d-flex justify-content-center text-center mb-4 py-3">
                        <img src={logo} className='img-fluid logo' alt="" />
                        <h1>Rapid Page Builder</h1>
                    </div>
                    <form className='px-5 pb-3 grey-border ' onSubmit={handleSubmit}>
                        <h3 className='my-5 fs-2 '>Register</h3>
                        <div className="mb-3">
                            <label htmlFor="nameInput" className="form-label">Full Name <span className='text-danger'>*</span></label>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="p-2 form-control" id="nameInput" autoComplete="on" placeholder='Enter Name' />
                        </div>
                        <div>
                            <label htmlFor="exampleInputEmail1" className="form-label">Username or email address <span className='text-danger'>*</span></label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="p-2 form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter your email address' />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password <span className='text-danger'>*</span></label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="p-2 form-control" id="exampleInputPassword1" autoComplete="on" placeholder='Enter password' />
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} />
                            <label className="form-check-label" htmlFor="exampleCheck1">Subscribe to our newsletter</label>
                        </div>
                        <p>Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <span className='text-primary'>privacy policy</span>.</p>
                        <div className="justify-content-between">
                            <button type="submit" className="btn primary-bg-color text-white my-4 ">Register</button>
                            <Link to="/login"><button type='button' className='btn primary-color  my-4'><u>Already have an account?</u></button></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
