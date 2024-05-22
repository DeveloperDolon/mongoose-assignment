"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./app/modules/product/product.route");
const order_route_1 = require("./app/modules/order/order.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    const a = 10;
    console.log(a, 'something-new');
    res.send('Hello World!');
});
// route for product data management
app.use('/api/products', product_route_1.ProductRoutes);
// route for order data management
app.use('/api/orders', order_route_1.OrderRoutes);
app.all('*', (req, res) => {
    // for all error of server this will be execute
    res.status(400).json({
        success: false,
        message: 'Route not found',
    });
});
exports.default = app;
