const express = require('express');
const router = express.Router();
const shopControllers = require('../controllers/shopController.js');


router.get('/', shopControllers.shop);
router.get('/', shopControllers.shop_search);
router.get('/item/:id', shopControllers.item);
router.post('/item/:id/add', shopControllers.add_item);
router.get('/cart', shopControllers.cart);
router.post('/cart', shopControllers.cart_to_checkout);

module.exports = router;


