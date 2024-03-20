
import React, { useState } from 'react';
import img from '../assets/nopage.svg'

const MediaDiv = () => {
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    return (
        <>
            <div className="attachements col-md-4" >
                <div className='default-img  col-md-4'>
                <img src={img}></img>
                <img src={img}></img>
                <img src={img}></img>
                <img src={img}></img>
                <img src={img}></img>
                <img src={img}></img>
                <img src={img}></img>
                <img src={img}></img>
                </div>
                <label htmlFor="formFile" className="form-label">Select file</label>
                <input className="form-control" type="file" id="formFile" accept=".png,.jpg,.jpeg,.svg,.pdf" onChange={handleFileChange} />
            </div>
        </>
    );
};

export default MediaDiv;
