import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productZodSchema from './product.zodvalidation';

const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = req.body;

    const zodParsedData = productZodSchema.parse(product);
    const result = await ProductServices.createProductIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err?.name === 'ZodError' ? err : err?.message,
    });
  }
};

// get all product from db or search
const getAllProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { searchTerm } = req.query;

    if (!searchTerm) {
      const result = await ProductServices.getAllProductsFromDB('all');

      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: result,
      });
    } else if (searchTerm) {
      const result = await ProductServices.getAllProductsFromDB(
        searchTerm as string,
      );

      res.status(200).json({
        success: true,
        message: `Products matching search term '${searchTerm}' fetched successfully!`,
        data: result,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err?.name === 'ZodError' ? err : err?.message,
    });
  }
};

// delete single product using id
const deleteSingleProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const productId = req.params.id;

    await ProductServices.deleteSingleProductIntoDB(productId);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err?.message,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
