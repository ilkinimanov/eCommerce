const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/productControllers');

router
  .route('/')
    .get(productControllers.getProducts)
    .post(productControllers.createProduct);

router
  .route('/:id')
    .get(productControllers.getProductById)
    .patch(productControllers.updateProductById)
    .delete(productControllers.deleteProduct)

module.exports = router;
