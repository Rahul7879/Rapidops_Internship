
import './App.css'
import SignUp from './Components/SignUp'
import Login from './Components/Login'
import {Routes,Route,Navigate} from 'react-router-dom';
import Home from './Components/Home';
import CreatePage from './Components/CreatePage';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import MainSideBar from './Components/MainSideBar';
import Dashboard from './Components/Dashboard';
import { useState } from 'react';
import EditPage from './Components/EditPage';


 function App() {


  return (
    <>
     <Routes>
     <Route  path='/login' element={<Login />}></Route>
     <Route exact path='/' element={<Home/>}></Route>
     <Route exact path='/signup' element={<SignUp/>}></Route>
     <Route exact path='/dashboard' element={<Dashboard/>}></Route>
     <Route exact path='/createpage' element={<CreatePage/>}></Route>
     <Route exact path='/edit' element={<EditPage/>}></Route>
     </Routes>
     <ToastContainer/>
    </>
  )
}

export default App
