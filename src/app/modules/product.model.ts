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
    type: String,
    enum: {
      values: ['computer', 'peripherals', 'wireless', 'ergonomic'],
      message: `{VALUE} is not valid.`,
    },
  },
  variants: variantsSchema,
  inventory: inventorySchema,
});

const ProductModel = model<ProductT>('Products', productSchema);
export default ProductModel;
