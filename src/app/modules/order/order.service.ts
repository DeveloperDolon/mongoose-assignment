import { OrderT } from './order.interface';
import OrderModel from './order.model';

// order create on database function
const orderCreateIntoDB = async (orderData: OrderT) => {
  const result = OrderModel.create(orderData);

  return result;
};

const allOrderGetFromDB = async (email: string) => {
  if (email) {
    const result = await OrderModel.aggregate([
      {
        $match: {
          email: email,
        },
      },
    ]);

    return result;
  }

  const result = await OrderModel.find();
  return result;
};

export const OrderServices = {
  orderCreateIntoDB,
  allOrderGetFromDB,
};
