import ProductModel from '../product.model';
import { ProductT } from './product.interface';

const createProductIntoDB = async (productData: ProductT) => {
  const result = await ProductModel.create(productData);

  return result;
};

// all student get from collection
const getAllProductsFromDB = async () => {
  const result = await ProductModel.find();

  return result;
};

// get single product with id from db
const getSingleProductFromDB = async (productId: string) => {
  const result = await ProductModel.findById({ _id: productId });

  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
};
