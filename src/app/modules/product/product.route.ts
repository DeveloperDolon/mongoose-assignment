import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

// product creating route
router.post('/', ProductController.createProduct);

// all products getting route
router.get('/', ProductController.getAllProduct);

export const ProductRoutes = router;
