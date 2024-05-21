import { Schema, model } from 'mongoose';
import { OrderT } from './order.interface';

const orderSchema = new Schema<OrderT>({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const OrderModel = model<OrderT>('Order', orderSchema);
export default OrderModel;
