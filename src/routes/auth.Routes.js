const express = require('express');
const validator = require('../middleware/validator.js')
const bodyParser = require('body-parser')
const router = express.Router();
const authControllers = require('../controllers/authController.js');

router.use(bodyParser.json());

router.get('/login', authControllers.login);
router.post('/login', authControllers.login_post);
router.post('/register', validator.newRegister, authControllers.register_post);
router.get('/register', authControllers.register);
router.get('/logout', authControllers.logout);


module.exports = router;