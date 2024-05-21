import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productZodSchema from './product.zodvalidation';

const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('hello world.');
    const { product } = req.body;
    const zodParsedData = productZodSchema.parse(product);
    const result = await ProductServices.createProductIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err?.name === 'ZodError' ? err : err?.message,
    });
  }
};

export const ProductController = {
  createProduct,
};
