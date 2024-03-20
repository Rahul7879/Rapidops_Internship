import React, { Component } from 'react'
import loading from '../assets/spinner.gif'

function Spinner()  {
    return (
      <div className='text-center'>
        <img src={loading} alt="loading" />
      </div>
    );
}

export default Spinner