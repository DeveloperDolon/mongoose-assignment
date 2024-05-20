import mongoose, { Schema, model } from 'mongoose';
import {
  InventoryT,
  ProductT,
  SingleVariantsT,
  Variants,
} from './product/product.interface';

const inventorySchema = new Schema<InventoryT>({
  quantity: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
});

const singleVariantSchema = new Schema<SingleVariantsT>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

const variantsSchema = new Schema<Variants>({
  variants: { type: [singleVariantSchema], required: true },
});

const productSchema = new Schema<ProductT>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: {
    type: [String],
    required: true,
  },
  variants: variantsSchema,
  inventory: inventorySchema,
});

// creating a custom static method ....
productSchema.statics.isProductExist = async function (id: string) {
  const existingProduct = await ProductModel.findOne({ _id: id });

  return existingProduct;
};

const ProductModel = model<ProductT>('Products', productSchema);
export default ProductModel;
