import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user,setUser] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            try {
                let response = await axios.post("http://localhost:8000/profile", {}, {
                    withCredentials: true
                });
                console.log( "Response Data");
                if (response && response.data) {
                    setUser(response.data.data);
                    console.log("Profile data retrieved:", response.data.data);
                } else {
                    navigate("/login")
                    console.error("Unexpected response structure:", response);

                }
            } catch (error) {
                navigate("/login")
                console.error("Error retrieving profile data:", error);
                if (error.response) {
                    console.error("Error :", error.response.data);
                } else if (error.request) {
                    console.error("No response received:", error.request);
                } else {
                    console.error("Error setup:", error.message);
                }
            }
        })();
    },[]);

    async function logOutUser() {
        console.log("hello")
       await axios.post("http://localhost:8000/logout", {}, {
            withCredentials: true
        });
        navigate('/login')
     
    }

    return (
        <div>
            <h1>Name {user?.fullName}</h1>
            <h1>UserId {user?.id}</h1>
            <p>email {user?.email} </p>
            <button onClick={()=>logOutUser()}  >Logout</button>
            
        </div>
    );
}

export default Profile;
