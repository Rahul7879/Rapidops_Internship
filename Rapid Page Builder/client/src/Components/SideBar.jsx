import React, { useState } from 'react';

const SidebarWithToggle = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    const handleToggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <div className='mainsidebar '>
            {isSidebarVisible ? (
                <div className=' col-md-12 my-border p-3 m-0'>
                    <div className="configurations d-flex justify-content-between border-bottom-1">
                        <p>Configurations</p>
                        <p onClick={handleToggleSidebar} style={{cursor: 'pointer'}}>X</p>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label" onChange={(e) => setTitle(e.target.value)}>* URL</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label" onChange={(e) => setSubTitle(e.target.value)}>Author</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  </div>
                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={(e) => setNewsletter(e.target.checked)} />
                    <label className="form-check-label" htmlFor="exampleCheck1">Show Author</label>
                  </div>
                </div>
            ) : (
                <p onClick={handleToggleSidebar} className="btn btn-primary">=</p>
            )}
        </div>
    );
};

export default SidebarWithToggle;
