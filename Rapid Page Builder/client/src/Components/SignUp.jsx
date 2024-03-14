import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/Group.png';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newsletter, setNewsletter] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email,password,newsletter);
        axios.post('http://localhost:5000/signup', {
            email: email,
            password: password,
            newsletter: newsletter
        }).then((res) => {
          if(res.data.code !== 401){
            setEmail("");
            setPassword("");
            toast.success("Signup Successfully")
          }else{
            toast.warn("User already Exists")
          }
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className='container mt-5 pt-5'>
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-8">
                    <div className="d-flex justify-content-center text-center mb-4 py-3">
                        <img src={logo} className='img-fluid logo' alt="" />
                        <h1>Rapid Page Builder</h1>
                    </div>
                    <form className='px-5 '>
                        <h3 className='my-5 fs-2 fw-normal'>Register</h3>
                        <div>
                            <label htmlFor="exampleInputEmail1" className="form-label">Username or email address *</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='enter your email address' />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password *</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" autoComplete="on" placeholder='enter password' />
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1"  onChange={(e)=>setNewsletter(e.target.checked)} />
                            <label className="form-check-label" htmlFor="exampleCheck1">Subscribe to our newsletter</label>
                        </div>
                        <p>Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <span className='text-primary'>privacy policy</span></p>
                        <div className="d-flex justify-content-between">
                        <button type="submit" onClick={handleSubmit} className="btn btn-primary my-4 ">Register</button>
                        <Link to="/login"><button className='btn btn-dark my-4'>Login</button></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
