import { OrderT } from './order.interface';
import OrderModel from './order.model';

// order create on database function
const orderCreateIntoDB = async (orderData: OrderT) => {
  const result = OrderModel.create(orderData);

  return result;
};

export const OrderServices = {
  orderCreateIntoDB,
};
