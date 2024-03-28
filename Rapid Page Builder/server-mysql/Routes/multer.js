import multer from "multer";
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
    console.log('coming in this',file)
  },
});


const upload = multer({
  storage,
});

export default upload