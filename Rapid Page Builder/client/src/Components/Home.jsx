import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    useEffect(()=>{
      const token = localStorage.getItem("Token");
      if(!token){
        navigate('/login')
      }
    },[])
  return (
    <div>
      <h1>Home page</h1>
    </div>
  )
}

export default Home
