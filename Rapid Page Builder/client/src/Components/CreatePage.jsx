import React, { useState } from 'react'
import axios from 'axios';

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [body, setBody] = useState("");
  const [isDraft, setIsDraft] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(title,subTitle,body,isDraft);
    axios.post('http://localhost:5000/create', {
      title: title,
      subTitle: subTitle,
      body: body,
      isDraft: isDraft
    }).then((res) => {
      alert("published")
    }).catch((err) => {
      alert("Some error");
        console.log(err);
    });
}

  return (
    <div>
      <h1>create page</h1>

      <form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label" onChange={(e)=>setTitle(e.target.value)}>Title</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label" onChange={(e)=>setSubTitle(e.target.value)}>Sub Title</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label" onChange={(e)=>setBody(e.target.value)}>Body</label>
    <input type="text" className="form-control" id="exampleInputPassword1"/>
  </div>
  <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
</form>
    </div>
  )
}

export default CreatePage
