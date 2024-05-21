import { Request, Response } from 'express';
import ProductModel from '../product.model';
import orderZodValidation from './order.zodvalidation';
import { OrderServices } from './order.service';

// order creating controller ......
const orderCreate = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderData = req.body;

    const checkingOrUpdateProductQuantity =
      await ProductModel.updateProductQuantity(
        orderData.productId,
        parseInt(orderData.quantity),
      );

    if (checkingOrUpdateProductQuantity?.success) {
      const zodParsedData = orderZodValidation.parse(orderData);
      const result = await OrderServices.orderCreateIntoDB(zodParsedData);

      res.status(200).json({
        success: true,
        message: 'Order created successfully',
        data: result,
      });
    } else {
      res.status(500).json(checkingOrUpdateProductQuantity);
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const OrderController = {
  orderCreate,
};
