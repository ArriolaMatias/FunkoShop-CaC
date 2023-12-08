const multer = require('multer');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/img/storage');
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const uploadFile = multer({storage:storage})

module.exports = uploadFile;