import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

// order creating route
router.post('/', OrderController.orderCreate);

// all order getting route
router.get('/', OrderController.getAllOrder);

export const OrderRoutes = router;
