import ProductModel from '../product.model';
import { ProductT } from './product.interface';

const createProductIntoDB = async (productData: ProductT) => {
  const result = await ProductModel.create(productData);

  return result;
};

export const ProductServices = {
  createProductIntoDB,
};
