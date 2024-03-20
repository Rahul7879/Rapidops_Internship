import React from 'react';
import img from '../assets/nopage.svg';
import { useNavigate } from 'react-router-dom';
import MainSidebar from './MainSideBar';

const NoPagesFound = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex">
      <MainSidebar />
      <div className="card p-0 p-lg-5 flex-grow-1">
        <div className="row g-0">
          <div className="col-md-12 col-lg-8 mt-5">
            <div className="card-body">
              <h2 className="card-title">No Pages Found</h2>
              <p className="card-text ">Looks like you don't have any pages yet. Let's add a new page.</p>
              <button className='btn primary-bg-color text-white' onClick={()=>navigate('/createpage')}>+ Add Pages</button>
            </div>
          </div>
          <div className="col-md-12 col-lg-4 d-flex align-items-center justify-content-center">
            <img src={img} className="img-fluid rounded-start" alt="No Pages" style={{maxWidth: '100%', height: 'auto'}}></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoPagesFound;
