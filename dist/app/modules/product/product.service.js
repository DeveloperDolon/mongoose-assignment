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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const product_model_1 = __importDefault(require("../product.model"));
const createProductIntoDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.create(productData);
    return result;
});
// all student get from collection and search product
const getAllProductsFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    if (searchTerm === 'all') {
        const result = yield product_model_1.default.find();
        return result;
    }
    else if (searchTerm) {
        const result = yield product_model_1.default.aggregate([
            {
                $match: {
                    name: {
                        $regex: searchTerm,
                        $options: 'i', // 'i' for case-insensitive
                    },
                },
            },
        ]);
        return result;
    }
});
// get single product with id from db
const getSingleProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findById({ _id: productId });
    return result;
});
// update single product with id
const updateSingleProductIntoDB = (productId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedDataResult = yield product_model_1.default.findByIdAndUpdate(productId, updatedData, { new: true, runValidators: true });
    return updatedDataResult;
});
// delete a single product with in into db
const deleteSingleProductIntoDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.deleteOne({ _id: productId });
    return result;
});
exports.ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    updateSingleProductIntoDB,
    deleteSingleProductIntoDB,
};
