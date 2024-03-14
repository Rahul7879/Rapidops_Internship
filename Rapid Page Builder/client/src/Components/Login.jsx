import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/Group.png';
import { Link, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';



const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/login', {
            email: email,
            password: password,
        }).then((res) => {
            if(res.data.code === 200){
                navigate('/createpage');
                localStorage.setItem("Token",res.data.token)
                toast.success("login successufull")
    
            }else if(res.data.code === 404){
                toast.warn("Wrong password")
            }else if(res.data.code === 501){
                toast.error("Accound not Found")
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
                        <h3 className='my-5 fs-2 fw-normal'>Login</h3>
                        <div>
                            <label htmlFor="exampleInputEmail1" className="form-label">Username or email address *</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='enter your email address' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password *</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" autoComplete="on" placeholder='enter password' />
                        </div>
                        <div className="d-flex justify-content-between">
                        <button type="submit" onClick={handleSubmit} className="btn btn-primary my-4 ">Login</button>
                        <Link to="/signup"><button className='btn btn-dark my-4'>create account</button></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;

