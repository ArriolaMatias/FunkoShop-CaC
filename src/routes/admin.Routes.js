const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');
const uploadFile = require('../middleware/multer.js');
const {requireAdmin} = require('../middleware/express-session.js');


router.get('/',requireAdmin, adminController.admin);
router.get('/create',requireAdmin, adminController.create);
router.post('/create',requireAdmin,uploadFile.fields([{ name: 'image_front', maxCount: 1 }, { name: 'image_back', maxCount: 1 }]),adminController.create_post);
router.get('/create',requireAdmin, adminController.create);
router.get('/edit/:id',requireAdmin, adminController.edit);
router.post('/edit/:id',requireAdmin,uploadFile.fields([{ name: 'image_front', maxCount: 1 }, { name: 'image_back', maxCount: 1 }]), adminController.edit_post);
router.get('/delete/:id',requireAdmin, adminController.delete);
router.get('/delete/confirm/:id',requireAdmin, adminController.delete_confirm);

module.exports = router;
