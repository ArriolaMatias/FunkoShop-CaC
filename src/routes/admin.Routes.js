const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');

router.get('/', adminController.admin);
router.get('/create', adminController.create);
router.post('/create', adminController.create_post);
router.get('/create', adminController.create);
router.get('/edit/:id', adminController.edit);
router.post('/edit/:id', adminController.edit_post);
router.delete('/delete/:id', adminController.delete);

module.exports = router;
