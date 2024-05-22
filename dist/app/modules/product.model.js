"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const inventorySchema = new mongoose_1.Schema({
    quantity: {
        type: Number,
        required: true,
    },
    inStock: {
        type: Boolean,
        required: true,
    },
});
const singleVariantSchema = new mongoose_1.Schema({
    type: { type: String, required: true },
    value: { type: String, required: true },
});
const productSchema = new mongoose_1.Schema({
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
productSchema.statics.updateProductQuantity = function (id, orderQuantity) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        const product = yield ProductModel.findOne({ _id: id });
        // checking product quantity with order quantity
        if (product && ((_a = product === null || product === void 0 ? void 0 : product.inventory) === null || _a === void 0 ? void 0 : _a.quantity) >= orderQuantity) {
            yield ProductModel.findByIdAndUpdate(id, {
                inventory: {
                    quantity: ((_b = product === null || product === void 0 ? void 0 : product.inventory) === null || _b === void 0 ? void 0 : _b.quantity) - orderQuantity,
                    inStock: ((_c = product === null || product === void 0 ? void 0 : product.inventory) === null || _c === void 0 ? void 0 : _c.quantity) > 0,
                },
            }, { new: true });
            return { success: true, message: 'Product quantity is updated.' };
        }
        else if (!product) {
            // checking product if not exist
            return { success: false, message: 'Product product is not found.' };
        }
        else if (((_d = product === null || product === void 0 ? void 0 : product.inventory) === null || _d === void 0 ? void 0 : _d.quantity) < orderQuantity ||
            ((_e = product === null || product === void 0 ? void 0 : product.inventory) === null || _e === void 0 ? void 0 : _e.quantity) === 0) {
            // checking product quantity if insufficient
            return {
                success: false,
                message: 'Insufficient quantity available in inventory',
            };
        }
    });
};
const ProductModel = (0, mongoose_1.model)('Product', productSchema);
exports.default = ProductModel;
