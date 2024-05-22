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
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
const product_zodvalidation_1 = __importDefault(require("./product.zodvalidation"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        const zodParsedData = product_zodvalidation_1.default.parse(product);
        const result = yield product_service_1.ProductServices.createProductIntoDB(zodParsedData);
        res.status(200).json({
            success: true,
            message: 'Product created successfully!',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: (err === null || err === void 0 ? void 0 : err.name) === 'ZodError' ? err : err === null || err === void 0 ? void 0 : err.message,
        });
    }
});
// get all product from db or search
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        if (!searchTerm) {
            const result = yield product_service_1.ProductServices.getAllProductsFromDB('all');
            res.status(200).json({
                success: true,
                message: 'Products fetched successfully!',
                data: result,
            });
        }
        else if (searchTerm) {
            const result = yield product_service_1.ProductServices.getAllProductsFromDB(searchTerm);
            res.status(200).json({
                success: true,
                message: `Products matching search term '${searchTerm}' fetched successfully!`,
                data: result,
            });
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: (err === null || err === void 0 ? void 0 : err.name) === 'ZodError' ? err : err === null || err === void 0 ? void 0 : err.message,
        });
    }
});
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.getSingleProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: 'Product fetched successfully!',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: (err === null || err === void 0 ? void 0 : err.name) === 'ZodError' ? err : err === null || err === void 0 ? void 0 : err.message,
        });
    }
});
// update singe product using id
const updateSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const updatedData = req.body;
        const result = yield product_service_1.ProductServices.updateSingleProductIntoDB(id, updatedData);
        res.status(200).json({
            success: true,
            message: 'Product updated successfully!',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: (err === null || err === void 0 ? void 0 : err.name) === 'ZodError' ? err : err === null || err === void 0 ? void 0 : err.message,
        });
    }
});
// delete single product using id
const deleteSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        yield product_service_1.ProductServices.deleteSingleProductIntoDB(productId);
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully!',
            data: null,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err === null || err === void 0 ? void 0 : err.message,
        });
    }
});
exports.ProductController = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateSingleProduct,
    deleteSingleProduct,
};
