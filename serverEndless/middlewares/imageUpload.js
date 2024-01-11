import multer from "multer";
import path from "path";

/* export const upload = multer({dest : 'uploads/'}) */


//FOR DISK STORAGE

 const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

/* //FOR Storing in AWS 
const storage = multer.memoryStorage() */


export const  Upload = multer({storage: storage})