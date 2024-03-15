import React, { useRef, useState } from 'react'
import axios from 'axios';
import JoditEditor from 'jodit-react'
import img from '../assets/nopage.svg'
import Sidebar from './SideBar';
import MainSidebar from './MainSideBar';

const config = {
  readonly: false,
  buttons: [
    'bold', 'italic', 'underline', '|',
    'ul', 'ol', '|',
    'outdent', 'indent', '|',
    'font', 'fontsize', 'brush', 'paragraph', '|',
    'align', '|',
    'undo', 'redo', '|',
    'hr', 'eraser', 'fullsize', 'image'
  ],
  uploader: {
    insertImageAsBase64URI: true, // Configures Jodit to insert images as Base64
  },
};

const CreatePage = () => {
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [content, setContent] = useState('')
  const [isDraft, setIsDraft] = useState(true);
  const [urlSlug, setUrlSlug] = useState("");
  const [isHide, setIsHide] = useState(false);

  let userEmail = localStorage.getItem("email");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/create', {
      email: userEmail,
      title: title,
      subTitle: subTitle,
      body: content,
      isDraft: isDraft,
      isHide: isHide,


    }).then((res) => {
      console.log(res, title, subTitle, content, isDraft, urlSlug, isHide);
      alert("publishedd")
    }).catch((err) => {
      alert("Some error");
      console.log(err);
    });
  }

  const [selectedFile, setSelectedFile] = useState(null);
  const defaultImages = [
    '/path/to/default-image1.png',
    '/path/to/default-image2.jpg',

  ];

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <>
      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <h1>rrr</h1>

              <div className="form-group">
                <label htmlFor="publishDate" style={{ marginLeft: "22px", marginTop: "10px" }}>Publish Date:</label>
                <input type="date" id="publishDate"   className='input-field' />
              </div>
              <div className="form-group">
                <label htmlFor="publishTime" style={{ marginLeft: "22px", marginTop: "10px" }}>Publish Time:</label>
                <input type="time" id="publishTime" className='input-field' />
              </div>
              <div className="buttons">
                <button type="button" className='cancel-btn' >Cancel</button>
                <button type="submit" className='publish-btn' >Publish</button>
              </div>


            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>

      <MainSidebar />
      <div className='mx-5 p-0'>
        <nav className="navbar navbar-light m-0  p-3">
          <div className="container-fluid">
            <a className="navbar-brand fs-3"> Home Page <span>draft</span></a>
            <div className="d-flex col-md-2 justify-content-between">
              <div className="dropdown">
                <button className="btn btn-secondary btn-custom pb-0 pt-0 fs-3 d-flex justify-content-center align-items-center" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                  <span>...</span>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <li><button className="dropdown-item" type="button">preview</button></li>
                  <li><button className="dropdown-item text-danger" type="button">delete</button></li>
                </ul>
              </div>
              <button className="btn btn-outline-dark" type="submit">cancel</button>
              <button className="btn btn-primary" type="submit">save</button>
              <button className="btn btn-success" type="submit" data-bs-toggle="modal" data-bs-target="#exampleModal">Publish</button>

            </div>
          </div>
        </nav>
        <hr className='p-0 m-0'></hr>

        <div className="content d-flex justify-content-between  m-0 p-0">

          <div className='col-md-9 col-sm-12 p-5 m-2'>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label" >Title</label>
              <input type="text" className="form-control" placeholder='enter title here' id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Sub Title</label>
              <input type="text" className="form-control" placeholder='enter subText here' id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setSubTitle(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Body</label>
              {/*<input type="text" className="form-control" id="exampleInputPassword1" />*/}
              <JoditEditor
                ref={editor}
                value={content}
                config={config}
                onChange={newContent => setContent(newContent)}
              />
              <div className="attachements mt-4  col-md-4" >
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
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
          </div>

          <div className=' my-border col-md-3   m-0'>

            <div className="configurations d-flex justify-content-between border-bottom-1">
              <p>Configurations</p>
              <p>X</p>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label" >* URL</label>
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setUrlSlug(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label" >Author</label>
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={(e) => setIsHide(e.target.checked)} />
              <label className="form-check-label" htmlFor="exampleCheck1">Show Author</label>
            </div>

          </div>

        </div>
      </div>
    </>
  )
}

export default CreatePage