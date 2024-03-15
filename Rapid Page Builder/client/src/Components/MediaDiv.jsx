
import React, { useState } from 'react';
import img from '../assets/nopage.svg'

const MediaDiv = () => {
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


// import React, { useState } from 'react';

// const MediaDiv = () => {
//     const [showModal, setShowModal] = useState(true);
//     const [selectedFile, setSelectedFile] = useState(null);
//     const defaultImages = [
//         '/path/to/default-image1.png',
//         '/path/to/default-image2.jpg',
//         // Add more default images as needed
//     ];

//     const handleFileChange = (event) => {
//         setSelectedFile(event.target.files[0]);
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         // Process the selected file
//         console.log(selectedFile);
//         setShowModal(false); // Close modal after submitting
//     };

//     return (
//         <>
//             <div className="container my-3">
//                 <div className="row">
//                     {defaultImages.map((imageSrc, index) => (
//                         <div key={index} className="col-sm-6 col-md-4 col-lg-3">
//                             <img src={imageSrc} alt={`Default ${index}`} className="img-fluid mb-2" />
//                         </div>
//                     ))}
//                 </div>
//                 <button type="button" className="btn btn-primary" onClick={() => setShowModal(true)}>
//                     Add Image
//                 </button>
//             </div>

//             {/* Modal */}
//             {showModal && (
//                 <div className="modal d-block" tabIndex="-1">
//                     <div className="modal-dialog">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title">Add a new image</h5>
//                                 <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
//                             </div>
//                             <div className="modal-body">
//                                 <form onSubmit={handleSubmit}>
//                                     <div className="mb-3">
//                                         <label htmlFor="formFile" className="form-label">Select file</label>
//                                         <input className="form-control" type="file" id="formFile" accept=".png,.jpg,.jpeg,.svg,.pdf" onChange={handleFileChange} />
//                                     </div>
//                                     <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
//                                     <button type="submit" className="btn btn-primary">Upload</button>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//             {showModal && <div className="modal-backdrop fade show"></div>}
//         </>
//     );
// };

// export default MediaDiv;
