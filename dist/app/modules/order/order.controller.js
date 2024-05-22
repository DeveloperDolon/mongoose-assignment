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
exports.OrderController = void 0;
const product_model_1 = __importDefault(require("../product.model"));
const order_zodvalidation_1 = __importDefault(require("./order.zodvalidation"));
const order_service_1 = require("./order.service");
// order creating controller ......
const orderCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const checkingOrUpdateProductQuantity = yield product_model_1.default.updateProductQuantity(orderData.productId, parseInt(orderData.quantity));
        if (checkingOrUpdateProductQuantity === null || checkingOrUpdateProductQuantity === void 0 ? void 0 : checkingOrUpdateProductQuantity.success) {
            const zodParsedData = order_zodvalidation_1.default.parse(orderData);
            const result = yield order_service_1.OrderServices.orderCreateIntoDB(zodParsedData);
            res.status(200).json({
                success: true,
                message: 'Order created successfully',
                data: result,
            });
        }
        else {
            res.status(500).json(checkingOrUpdateProductQuantity);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});
// all order getting controller
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        const result = yield order_service_1.OrderServices.allOrderGetFromDB(email);
        if (email && (result === null || result === void 0 ? void 0 : result.length) === 0) {
            res.status(500).json({
                success: false,
                message: 'Order not found',
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: `Orders fetched successfully${email ? ' for user email' : ''}!`,
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});
exports.OrderController = {
    orderCreate,
    getAllOrder,
};
