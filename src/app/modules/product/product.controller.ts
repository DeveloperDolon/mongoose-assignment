import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productZodSchema from './product.zodvalidation';
import ProductModel from '../product.model';

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

const getAllProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await ProductServices.getAllProductsFromDB();

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err?.name === 'ZodError' ? err : err?.message,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;

    const result = await ProductServices.getSingleProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err?.name === 'ZodError' ? err : err?.message,
    });
  }
};

// update singe product using id
const updateSingleProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = req.params.productId;
    const updatedData = req.body;

    const result = await ProductServices.updateSingleProductIntoDB(
      id,
      updatedData,
    );

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
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
  getAllProduct,
  getSingleProduct,
  updateSingleProduct,
};
