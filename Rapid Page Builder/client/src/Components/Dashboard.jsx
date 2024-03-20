import React, { useEffect, useState } from 'react';
import NoPagesFound from './NoPagesFound';
import axios from 'axios';
import Pages from './Pages';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showData, setShowData] = useState(false); 
    const userEmail = localStorage.getItem("email");
    const navigate = useNavigate();

    if(!userEmail){
        navigate("/login")
    }

  
function getCookie(name) {
    let cookies = document.cookie.split(';');
    for(let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return "";
  }
  
    useEffect(() => {
        axios.get('http://localhost:5000/getallpages/',{
            headers:{
                "Authorization":JSON.stringify({"a":getCookie("accessToken"),"r":getCookie('refreshtoken'),"email":localStorage.getItem("email")})
            }
        }).then((res) => {
            if(res.data.valid === false){
                navigate('/login')
            }
            if(res.data.result.length !== undefined && res.data.result.length !== 0){
                setData(res.data.result);
                setShowData(true);
            }
        }).catch((err) => {
            navigate("/login");

        }).finally(()=>{
           setLoading(false)
        });
    }, []);


    return (
        <div>
             {loading ? <Spinner/> : (showData) ? <Pages tasks={data}/> : <NoPagesFound/>}
        </div>
    );
};

export default Dashboard;

