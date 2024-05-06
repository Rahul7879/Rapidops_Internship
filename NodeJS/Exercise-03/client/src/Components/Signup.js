import React, { useState,useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
    const [user, setUser] = useState({ email: '', password: '', fullName: '' });
    const navigate = useNavigate();

    const [authUrl, setAuthUrl] = useState('');



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
        const { name, value } = event.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/signup', user,{
                withCredentials: true
            });
            console.log('Signup successful:', response.data);
            alert("Signup Successful")
            navigate("/");
        } catch (error) {
          if(error.response.status === 409){
            alert("User already exists");
          }else{
            console.error('Signup failed:', error.response || error);
          }
        }
    };

    return (
        <div style={{ alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f8f9fa' }} className='div-contain'>
            <img src="https://accounts.salesmate.io/assets/images/logo-dark.png" alt='logo image' width={300} className='mx-auto d-block' style={{ marginBottom: '20px' }} />
            <div className='container bg-white p-5' style={{ width: '100%', maxWidth: '400px' }}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="email"
                            placeholder='Email'
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            className="form-control"
                            id="signupEmail"
                            required />
                    </div>
                    <div className="mb-3">
                        <input type="password"
                            placeholder='Password'
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            className="form-control"
                            id="signupPassword"
                            required />
                    </div>
                    <div className="mb-3">
                        <input type="text"
                            placeholder='Full Name'
                            name="fullName"
                            value={user.fullName}
                            onChange={handleChange}
                            className="form-control"
                            id="signupFullName"
                            required />
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                    </div>
                    <div className='text-center'>
                    <small className='hr-lines'>start quickly with</small>
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
                </form>
                <div className="link-container text-center mt-3">
                    <small>Already have an account?
                        <Link to="/login" style={{ textDecoration: "none", marginLeft: "4px" }}>Log in</Link>
                    </small>
                </div>
            </div>
        </div>
    );
}

export default Signup;
