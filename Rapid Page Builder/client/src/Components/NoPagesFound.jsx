import React from 'react'
import img from '../assets/nopage.svg';

const NoPagesFound = () => {
  return (
    <div>
    <div className="card m-5 p-5" >
  <div className="row g-0 mx-5">
    <div className="col-md-8 mt-5">
      <div className="card-body">
        <h2 className="card-title">No Pages Found</h2>
        <p className="card-text fs-4">Looks like you don't have any pages yet. Let's add a new page.</p>
        <button className='btn btn-primary'>+ Add Pages</button>
      </div>
    </div>
    <div className="col-md-4">
    <img src={img} class="img-fluid rounded-start" alt="..."></img>
    </div>
  </div>
</div>
    </div>
  )
}

export default NoPagesFound
