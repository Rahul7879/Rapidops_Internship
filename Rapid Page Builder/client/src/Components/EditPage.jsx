import React, { useEffect, useRef, useState } from 'react'
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

function convertToISOWithIST(str) {
  const date = new Date(str + ":00+05:30");
  return date.toISOString();
}


const EditPage = () => {
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [content, setContent] = useState('');
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [isDraft, setIsDraft] = useState(true);
  const [urlSlug, setUrlSlug] = useState("");
  const [isHide, setIsHide] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  const navigate = useNavigate();
  let userEmail = localStorage.getItem("email");
  let contenteId = localStorage.getItem("editPage");

  useEffect(() => {
    axios.get('http://localhost:5000/getallpages/',{
        headers:{
            "Authorization":JSON.stringify({"a":getCookie("accessToken"),"r":getCookie('refreshtoken'),"email":localStorage.getItem("email")})
        }
    }).then((res) => {
        if(res.data.valid === false){
            navigate('/login')
        }
    }).catch((err) => {
        navigate("/login");
    })
  }, []);

  function getCookie(name) {
    let cookies = document.cookie.split(';');
    for(let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return "";
  }
  useEffect(()=>{
    axios.post('http://localhost:5000/get', {
      id : contenteId,
    }).then((res) => {
      let data = res.data.user
      console.log(data)
       setTitle(data.title)
       setSubTitle(data.subtitle);
       setContent(data.body);
       setUrlSlug(data.url);
       setDate(data.publishDate.substr(0,10))
       setIsPublished(new Date(data.publishDate) < new Date());
       console.log("here",isPublished)
       setTime(data.publishDate.substr(11,5))

    }).catch((err) => {
      alert("Some error");
      console.log(err);
    });
  },[])


  const handleUpdate = (event) => {
    event.preventDefault();
    axios.put('http://localhost:5000/update', {
      id:contenteId,
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

 
  const handlePublish = (event) => {
    event.preventDefault();
    axios.put('http://localhost:5000/update', {
      id:contenteId,
      email: userEmail,
      title: title,
      subTitle: subTitle,
      body: content,
      url: urlSlug,
      publishDate: convertToISOWithIST(date+"T"+time),
      isDraft: isDraft,
      isHide: isHide,
      status: "scheduled"
    }).then((res) => {
       toast.success("Page Publishedr successfully")
    }).catch((err) => {
      toast.error("Something went wrong")
      console.log(err);
    });
  }


function deletePage(id){
  console.log(id);
  axios.delete(`http://localhost:5000/delete/${id}`).then((res) => {
        toast.success("Deletion successful");
        navigate('/dashboard')
}).catch((err) => {
    console.log(err.response.status);
    toast.error("not deleted")
});
}


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-dark">
              <h5 className="modal-title text-light" id="exampleModalLabel">Publish</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">jjj</button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label" >*Publish Date</label>
                  <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">*Publish</label>
                  <input type="time" value={time} className="form-control" onChange={(e)=>setTime(e.target.value)} id="exampleInputPassword1" />
                </div>
              </form>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal">cancel</button>
              <button type="submit" className="btn btn-primary" onClick={handlePublish} >Publish</button>
            </div>
          </div>
        </div>
      </div>

      <MainSidebar  />
      <div className='mx-5 p-0'>
        <nav className="navbar navbar-light m-0  p-3">
          <div className="container-fluid">
            <a className="navbar-brand fs-3"> Home Page  <span>draft</span></a>
            <div className="d-flex col-md-2 justify-content-between">
              <div className="dropdown">
                <button className="btn btn-secondary btn-custom pb-0 pt-0 fs-3 d-flex justify-content-center align-items-center" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                  <span>...</span>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <li><button className="dropdown-item" type="button">preview</button></li>
                  <li><button className="dropdown-item text-danger" onClick={()=>deletePage(contenteId)} type="button">delete</button></li>
                </ul>
              </div>
              <button className="btn btn-outline-dark" onClick={()=>navigate('/dashboard')} type="submit">cancel</button>
              <button className="btn btn-primary" type="submit" onClick={handleUpdate} >save</button>
              {!isPublished ? <button className="btn btn-success" type="submit" data-bs-toggle="modal"  data-bs-target="#exampleModal">Publish</button> : <button>Published</button>}

            </div>
          </div>
        </nav>
        <hr className='p-0 m-0'></hr>

        <div className="content d-flex justify-content-between  m-0 p-0">

          <div className='col-md-9 col-sm-12 p-5 m-2'>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label" >Title</label>
              <input value={title} type="text" className="form-control" placeholder='enter title here' id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Sub Title</label>
              <input value={subTitle} type="text" className="form-control" placeholder='enter subText here' id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setSubTitle(e.target.value)} />
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
              <input value={urlSlug} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setUrlSlug(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label" >Author</label>
              <input type="text" className="form-control" value={localStorage.getItem("email")}  id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3 form-check">
              <input  type="checkbox" className="form-check-input" id="exampleCheck1" onChange={(e) => setIsHide(e.target.checked)} />
              <label  className="form-check-label" htmlFor="exampleCheck1">Show Author</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditPage
