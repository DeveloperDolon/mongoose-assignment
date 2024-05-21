import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

// order creating route
router.post('/', OrderController.orderCreate);

export const OrderRoutes = router;
