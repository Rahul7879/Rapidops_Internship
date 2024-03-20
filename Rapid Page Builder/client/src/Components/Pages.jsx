import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import MainSidebar from './MainSideBar';
import { useNavigate } from 'react-router-dom';
import union from '../assets/Union.png';
import axios from 'axios';
import { toast } from 'react-toastify';

const customStyles = {
  headCells: {
    style: {
      fontSize: '20px',
      fontWeight: "normal",
    },
  },
  cells: {
    style: {
      fontSize: '16px',
    },
  },
};

function deletePage(id,email) {
  
  if(email !== localStorage.getItem("email")){
    toast.error("You can't Delete");
    return;
  }

  axios.delete(`http://localhost:5000/delete/${id}`)
    .then(() => {
      toast.success("Deletion successful");
    })
    .catch((err) => {
      console.log(err.response.status);
      toast.error("Deletion failed");
    });
}

const Pages = ({ tasks }) => {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedUser, setSelectedUser] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  function editPage(_id,email) {
    console.log("edit");
    if(email !== localStorage.getItem("email")){
      toast.error("You can't Edit");
      return;
    }
    localStorage.setItem("editPage", `${_id}`);
    navigate('/edit');
  }

  const columns = [
    {
      name: 'Title',
      selector: row => row.title,
    },
    {
      name: 'URL',
      selector: row => <a href={`http://localhost:5000/pages/${row.url}`} >{row.url}</a>,
    },
    {
      name: "Created By",
      selector: row => row.email
    },
    {
      name: "Created At",
      selector: row => row.createdAt
    },
    {
      name: "Status",
      selector: row => (row.publishDate === '0000-00-00T00:00') ? <span className='text-warning status' >draft </span> : (new Date(row.publishDate).getTime() > Date.now()) ? <span className='text-primary status'>scheduled</span> : <span className='text-success status '>Published</span>
    },
    {
      name: "Actions",
      selector: row => <div><button onClick={() => editPage(row._id,row.email)}>edit</button> <button className='bg-danger' onClick={() => deletePage(row._id,row.email)}>delete</button></div>
    }
  ];

  function filterData() {
    return tasks.filter((task) => {
      const statusCondition = selectedStatus === 'All' ||
        (selectedStatus === "Published" && new Date(task.publishDate).getTime() < Date.now() && task.publishDate !== "0000-00-00T00:00") ||
        (selectedStatus === "Draft" && task.publishDate === "0000-00-00T00:00") ||
        (selectedStatus === "Scheduled" && new Date(task.publishDate).getTime() > Date.now() && task.publishDate !== "0000-00-00T00:00");
      const userCondition = selectedUser === 'All' || task.email === selectedUser;
      const searchCondition = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || task.email.toLowerCase().includes(searchTerm.toLowerCase());
      return statusCondition && userCondition && searchCondition;
    });
  }

  const filteredData = filterData();
  const users = Array.from(new Set(tasks.map(task => task.email)));

  return (
    <div>
      <MainSidebar />

      <div style={{ marginLeft: '80px' }}>
        <nav className="navbar navbar-light m-0 p-3">
          <div className="container-fluid">
            <div className='d-flex'>
              <img className='img-fluid p-4' src={union} alt="Logo"/>
              <div>
                <p className="navbar-brand fs-4 p-0 m-0">Pages</p>
                <p className='fs-6 p-0 m-0'>Create and Publish Pages</p>
              </div>
            </div>
            <button className="btn primary-bg-color text-white" type="submit" onClick={() => navigate('/createpage')}>+ Add Pages</button>
          </div>
        </nav>

        <div className="d-flex justify-content-between align-items-center p-3">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className='btn'>Status</button>
          <select className="form-select mx-2" style={{ width: 'auto', border: '2px solid', fontSize: '1rem' }} onChange={(e) => setSelectedStatus(e.target.value)} value={selectedStatus}>
            <option value="All">All</option>
            <option value="Draft">Draft</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Published">Published</option>
          </select>
          <button className='btn'>User</button>
          <select className="form-select" style={{ width: 'auto', border: '2px solid', fontSize: '1rem' }} onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser}>
            <option value="All">All Users</option>
            {users.map(user => (
              <option key={user} value={user}>{user}</option>
            ))}
          </select>
        </div>
        
        <DataTable
          columns={columns}
          data={filteredData}
          customStyles={customStyles}
        />
      </div>
    </div>
  );
};

export default Pages;
