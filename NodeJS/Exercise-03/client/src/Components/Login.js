import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';


function Login() {
    const [credentials, setCredentials] = useState({ email: '', password: '', rememberMe: false });
    const [authUrl, setAuthUrl] = useState('');
    const navigate = useNavigate();


  useEffect(() => {
    const fetchAuthUrl = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/get-auth-url');
        setAuthUrl(data.data.url);  

      } catch (error) {
        console.error('Error fetching auth URL:', error);
      }
    };

    fetchAuthUrl();
  }, []);



    const handleChange = (event) => {
        const { name, type, checked, value } = event.target;
        setCredentials(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(credentials)
            const response = await axios.post('http://localhost:8000/login', credentials, {
                withCredentials: true
            });

            navigate("/");
        } catch (error) {

            if(error.response.status === 401){
                alert("Wrong Password")
            }else if(error.response.status === 404){
                alert("User Does Not Exit")
            }else{
                console.error('Login Failed:', error.response || error);
            }
            
        }
    };

    return (
        <div style={{ alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f8f9fa' }} className='div-contain'>
            <img src="https://accounts.salesmate.io/assets/images/logo-dark.png" alt='logo' width={300} className='mx-auto d-block' style={{ marginBottom: '20px' }} />
            <div className='container bg-white p-5 border' style={{ width: '100%', maxWidth: '400px' }}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="email"
                            placeholder='Email'
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <input type="password"
                            placeholder='Password'
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            className="form-control"
                            id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 d-flex justify-content-between">
                        <div className="form-check">
                            <input type="checkbox"
                                className="form-check-input"
                                name="rememberMe"
                                checked={credentials.rememberMe}
                                id="exampleCheck1"
                                onChange={handleChange} />
                            <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                        </div>
                        <div style={{ marginLeft: '10px' }}>
                            <Link to="/forgot-password" style={{ textDecoration: 'none' }}>Forgot password?</Link>
                        </div>
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary w-100">Sign In</button>
                    </div>
                </form>
                <div className='text-center'>
                    <small className='hr-lines'>Or Sign IN with</small>
                </div>
                <div className='d-flex justify-content-around mt-3'>
                <a href={authUrl}>
                    <p className='d-flex' style={{ backgroundColor: '#f8f9fa', padding: "8px 26px" }}>
                        <img src="https://accounts.salesmate.io/assets/images/gicon.svg" alt="" height={22} className='mx-2' />
                        Google
                    </p>
                    </a>

                    <p className='d-flex' style={{ backgroundColor: '#f8f9fa', padding: "8px 26px" }}>
                        <img src=" https://accounts.salesmate.io/assets/images/ic_sso.svg" alt="" height={20} className='mx-2' />
                        SSO
                    </p>
                </div>
                <div className="link-container text-center mt-3">
                    <small>
                    Not registered yet
                        <Link to="/signup" style={{ textDecoration: "none",marginLeft:"4px"}}>Sign up</Link>
                    </small>
                </div>
            </div>
        </div>
    );
}

export default Login;
