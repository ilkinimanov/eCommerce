import express from 'express';
import * as productControllers from '../controllers/productControllers.js';

const router = express.Router();

router
  .route('/')
    .get(productControllers.getProducts)
    .post(productControllers.createProduct);

router
  .route('/:id')
    .get(productControllers.getProductById)
    .patch(productControllers.updateProductById)
    .delete(productControllers.deleteProduct)

export default router;
