import { Application, Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/product/product.route';
import { OrderRoutes } from './app/modules/order/order.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  const a = 10;

  console.log(a, 'something-new');

  res.send('Hello World!');
});

// route for product data management
app.use('/api/products', ProductRoutes);

// route for order data management
app.use('/api/orders', OrderRoutes);

export default app;
