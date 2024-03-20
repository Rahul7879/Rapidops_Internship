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

{
//     useEffect(()=>{
//         axios.get('http://localhost:5000/checkUser')
//         .then(res=>{
//             console.log(res,"eeegdsa")
//             if(res.data.valid){
//                 alert("valid")
                
//             }else{
//                alert("not valid")
//             }
//         })
//         }
//     ,[])
}


    useEffect(() => {
        axios.get('http://localhost:5000/getallpages', {
        }).then((res) => {
            console.log(res);
            if(res.data.result.length !== undefined && res.data.result.length !== 0){
                setData(res.data.result);
                setShowData(true);
            }
        }).catch((err) => {
            console.log(err);
            alert("Some error");
        }).finally(()=>{
           setLoading(false)
        });
    }, [userEmail]);


    return (
        <div>
             {loading ? <Spinner/> : (showData) ? <Pages tasks={data}/> : <NoPagesFound/>}
        </div>
    );
};

export default Dashboard;

