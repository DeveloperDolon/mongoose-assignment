import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

// product creating route
router.post('/', ProductController.createProduct);

export const ProductRoutes = router;
