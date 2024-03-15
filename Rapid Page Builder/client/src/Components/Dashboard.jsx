import React, { useEffect } from 'react'
import NoPagesFound from './NoPagesFound';
import axios from 'axios';

const Dashboard = () => {

    const userEmail = localStorage.getItem("email");

  useEffect(()=>{
    axios.post('http://localhost:5000/getdata', {
        email:userEmail,
      }).then((res) => {
        console.log(res,title, subTitle, content, isDraft,urlSlug,isHide);
        alert("publishedd")
      }).catch((err) => {
        alert("Some error");
        console.log(err);
      });
  },[])

  return (
    <div>
    <NoPagesFound/>
    </div>
  )
}

export default Dashboard
