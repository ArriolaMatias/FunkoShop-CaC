const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');
const uploadFile = require('../middleware/multer.js');



router.get('/', adminController.admin);
router.get('/create', adminController.create);
router.post('/create',uploadFile.fields([{ name: 'image_front', maxCount: 1 }, { name: 'image_back', maxCount: 1 }]),adminController.create_post);
router.get('/create', adminController.create);
router.get('/edit/:id', adminController.edit);
router.post('/edit/:id',uploadFile.fields([{ name: 'image_front', maxCount: 1 }, { name: 'image_back', maxCount: 1 }]), adminController.edit_post);
router.get('/delete/:id', adminController.delete);
router.get('/delete/confirm/:id', adminController.delete_confirm);

module.exports = router;
