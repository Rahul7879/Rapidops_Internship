import './App.css'
import SignUp from './Components/SignUp'
import Login from './Components/Login'
import {Router,Routes,Route} from 'react-router-dom';
import Home from './Components/Home';
import NoPagesFound from './Components/NoPagesFound';
import Pages from './Components/Pages';
import CreatePage from './Components/CreatePage';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


function App() {


  return (
    <>
     <Routes>
     <Route exact path='/' element={<Home/>}></Route>
     <Route exact path='/signup' element={<SignUp/>}></Route>
     <Route exact path='/login' element={<Login/>}></Route>
     <Route exact path='/nopage' element={<NoPagesFound/>}></Route>
     <Route exact path='/pages' element={<Pages/>}></Route>
     <Route exact path='/createpage' element={<CreatePage/>}></Route>



     </Routes>
     <ToastContainer/>
    </>
  )
}

export default App
