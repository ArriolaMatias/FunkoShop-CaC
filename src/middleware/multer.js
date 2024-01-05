const multer = require('multer');
const { getLicenceById } = require("../models/licence.js");

const storage = multer.diskStorage({
    destination: async (req,file,cb)=>{
        let licence = await getLicenceById(req.body.licence_id);
        cb(null,`public/img/${licence.licence_name.replace(' ','-').trim().toLowerCase()}`);
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const uploadFile = multer({storage:storage})

module.exports = uploadFile;