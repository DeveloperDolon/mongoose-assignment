import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

// product creating route
router.post('/', ProductController.createProduct);

// all products getting route
router.get('/', ProductController.getAllProduct);

// get single product route
router.get('/:productId', ProductController.getSingleProduct);

// update single product route
router.put('/:productId', ProductController.updateSingleProduct);

// delete single product route
router.delete('/:productId', ProductController.deleteSingleProduct);

export const ProductRoutes = router;
