"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
// product creating route
router.post('/', product_controller_1.ProductController.createProduct);
// all products getting route
router.get('/', product_controller_1.ProductController.getAllProduct);
// get single product route
router.get('/:productId', product_controller_1.ProductController.getSingleProduct);
// update single product route
router.put('/:productId', product_controller_1.ProductController.updateSingleProduct);
// delete single product route
router.delete('/:productId', product_controller_1.ProductController.deleteSingleProduct);
exports.ProductRoutes = router;
