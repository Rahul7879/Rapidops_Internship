
import './App.css'
import SignUp from './Components/SignUp'
import Login from './Components/Login'
import {Router,Routes,Route,Outlet,Navigate} from 'react-router-dom';
import Home from './Components/Home';
import NoPagesFound from './Components/NoPagesFound';
import Pages from './Components/Pages';
import CreatePage from './Components/CreatePage';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import SidebarWithToggle from './Components/SideBar';
import MainSideBar from './Components/MainSideBar';
import Dashboard from './Components/Dashboard';
import { useState } from 'react';
import EditPage from './Components/EditPage';




const PrivateRoute = ({isAuthenticated}) => {
  return isAuthenticated ?
   <React.Fragment>
   <MainSideBar/>
  </React.Fragment> 
  : <Navigate replace to='/login'/>
 }
 function App() {
 
 
   const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
    <>
     <Routes>
     <Route  path='/login' element={<Login isUserAuthenticated={isUserAuthenticated} />}></Route>
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
