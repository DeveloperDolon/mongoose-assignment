import mongoose, { Schema, model } from 'mongoose';
import {
  InventoryT,
  ProductQuantityUpdate,
  ProductT,
  SingleVariantsT,
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

const productSchema = new Schema<ProductT>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: {
    type: [String],
    required: true,
  },
  variants: [singleVariantSchema],
  inventory: inventorySchema,
});

// // creating a custom static method ....
// productSchema.statics.isProductExist = async function (id: string) {
//   const existingProduct = await ProductModel.findOne({ _id: id });

//   return existingProduct;
// };

// checking product quantity and update
productSchema.statics.updateProductQuantity = async function (
  id: string,
  orderQuantity: number,
) {
  const product: unknown = await ProductModel.findOne({ _id: id });

  // checking product quantity with order quantity
  if (product && product?.inventory?.quantity >= orderQuantity) {
    const updateQuantityCount = await ProductModel.findByIdAndUpdate(
      id,
      {
        inventory: {
          quantity: product?.inventory?.quantity - orderQuantity,
          inStock: product?.inventory?.quantity > 0,
        },
      },
      { new: true },
    );
    return { success: true, message: 'Product quantity is updated.' };
  } else if (!product) {
    // checking product if not exist
    return { success: false, message: 'Product product is not found.' };
  } else if (
    product?.inventory?.quantity < orderQuantity ||
    product?.inventory?.quantity === 0
  ) {
    // checking product quantity if insufficient
    return {
      success: false,
      message: 'Insufficient quantity available in inventory',
    };
  }
};

const ProductModel = model<ProductT, ProductQuantityUpdate>(
  'Product',
  productSchema,
);
export default ProductModel;
