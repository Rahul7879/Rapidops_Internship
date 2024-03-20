import React, { useRef, useState,useEffect } from 'react'
import axios from 'axios';
import JoditEditor from 'jodit-react'
import img from '../assets/nopage.svg'
import MainSidebar from './MainSideBar';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
    insertImageAsBase64URI: true, 
  },
};



const CreatePage = () => {
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [content, setContent] = useState('');
  const [time, setTime] = useState("00:00");
  const [date, setDate] = useState("0000-00-00");
  const [isDraft, setIsDraft] = useState(true);
  const [urlSlug, setUrlSlug] = useState("");
  const [isHide, setIsHide] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [id,setId] = useState("")
  const userEmail = localStorage.getItem("email");
  const navigate = useNavigate()


  useEffect(() => {
    if (userEmail === null) {
      navigate("/login");
    }
  }, [userEmail, navigate]);


{/***
const handleDraft = async() => {
  const formData = new FormData();
  formData.append('email', userEmail);
  formData.append('title', title);
    formData.append('subTitle', subTitle);
    formData.append('body', content);
    formData.append('url', urlSlug);
    formData.append('isDraft', isDraft);
    formData.append('isHide', isHide);
    formData.append('status', 'draft');
    formData.append('publishDate',convertToISOWithIST(date+"T"+time));
    if (selectedFile) {
      formData.append('file', selectedFile);
    }
    axios.post('http://localhost:5000/create',
    formData).then((res) => {
      toast.success("Page Update successfully")
    }).catch((err) => {
      toast.error("Something went wrong")
      console.log(err);
    });
  }
**/}




const handleUpdate = () => {
  axios.put('http://localhost:5000/update', {
    id:id,
    email: userEmail,
    title: title,
    subTitle: subTitle,
    body: content,
    url: urlSlug,
    publishDate: convertToISOWithIST(date+"T"+time),
    isDraft: isDraft,
    isHide: isHide,
    status: "draft"
  }).then((res) => {
     toast.success("Page Update successfully")
  }).catch((err) => {
    toast.error("Something went wrong")
    console.log(err);
  });
}


  const handleSubmit = () => {

    axios.post('http://localhost:5000/create', {
      email: userEmail,
      title: title,
      subTitle: subTitle,
      body: content,
      url: urlSlug,
      publishDate: convertToISOWithIST(date + "T" + time),
      isDraft: isDraft,
      isHide: isHide,
      status: "scheduled",

    }).then((res) => {
      setContent('')
      setId(res.data.id)
      toast.success("Page Publication Scheduled")
      navigate('/dashboard')

    }).catch((err) => {
      alert("Some error");
      console.log(err);
    });
  }

  function handleTask(){
    if(id){
      handleUpdate();
    }else{
      handleSubmit();
    }
  }

  function convertToISOWithIST(str) {
    const date = new Date(str + ":00+05:30");
    return date.toISOString();
  }


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <>

      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-dark">
              <h5 className="modal-title text-light" id="exampleModalLabel">Publish </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">jjj</button>
            </div>
            <div className="modal-body">
              <form>
                <div class="mb-3">
                  <label htmlFor="exampleInputEmail1" class="form-label" >*Publish Date</label>
                  <input type="date" onChange={(e) => setDate(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                  <label ntmlFor="exampleInputPassword1" class="form-label">*Publish</label>
                  <input type="time" class="form-control" onChange={(e) => setTime(e.target.value)} id="exampleInputPassword1" />
                </div>
              </form>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal">cancel</button>
              <button type="submit" className="btn btn-primary" onClick={()=>handleTask()}>Submit</button>
            </div>
          </div>
        </div>
      </div>

      <MainSidebar />
      <div className='mx-5 p-0'>
        <nav className="navbar navbar-light m-0  p-3">
          <div className="container-fluid">
            <a className="navbar-brand fs-3"> Home Page {id} <span>draft</span></a>
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
              <button className="btn btn-primary" type="submit" onClick={() => handleTask()}>save</button>
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
              <input type="text" className="form-control" value={localStorage.getItem("email")} id="exampleInputEmail1" aria-describedby="emailHelp" />
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