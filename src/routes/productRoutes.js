import express from 'express';
import * as productControllers from '../controllers/productControllers.js';
import * as productMiddlewares from '../middlewares/productQueryMiddlewares.js';

const router = express.Router();

router
  .route('/')
    .get(
      productMiddlewares.productQueryFilter,
      productMiddlewares.productQuerySort,
      productMiddlewares.productQueryFields,
      productMiddlewares.productQueryPaginate,
      productControllers.getProducts
      )
    .post(productControllers.createProduct);

router
  .route('/:id')
    .get(
      productMiddlewares.productQueryFields,
      productControllers.getProductById
      )
    .patch(productControllers.updateProductById)
    .delete(productControllers.deleteProduct)

export default router;
