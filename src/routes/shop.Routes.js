const express = require('express');
const router = express.Router();
const shopControllers = require('../controllers/shopController.js');


router.get('/', shopControllers.shop);
router.get('/', shopControllers.shop_search);
router.post('/item/:id/:quantity/add', shopControllers.add_item);
router.get('/item/:id', shopControllers.item);
router.get('/cart', shopControllers.cart);
router.get('/checkout', shopControllers.cart_to_checkout);
router.post('/:id/:quantity/delete', shopControllers.delete_item);
router.post('/:id/deleteFromCart', shopControllers.delete_item);

module.exports = router;


