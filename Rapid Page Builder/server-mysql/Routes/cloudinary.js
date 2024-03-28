import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'daosgxxc3', 
  api_key: '127921576526313', 
  api_secret: 'zm1Eb65tZdnEpLX4whjEH_00-CA' 
});


const uploadOnCloudinary = async (localFilePath) => {
  try {
    console.log("in cloudinary ", localFilePath)
      const response = await cloudinary.uploader.upload(localFilePath, {
          resource_type: "auto"
      })
      console.log("file is uploaded on cloudinary ", response);
      
      return response;

  } catch (error) {
      return null;
  }
}


export default uploadOnCloudinary;


