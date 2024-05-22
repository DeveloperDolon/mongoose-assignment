"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Zod schema for InventoryT
const inventorySchema = zod_1.z.object({
    quantity: zod_1.z.number().int().positive(),
    inStock: zod_1.z.boolean().default(true),
});
// Zod schema for SingleVariantsT
const singleVariantSchema = zod_1.z.object({
    type: zod_1.z.string(),
    value: zod_1.z.string(),
});
// Zod schema for ProductT
const productZodSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number().positive(),
    category: zod_1.z.string(),
    tags: zod_1.z.array(zod_1.z.string()),
    variants: zod_1.z.array(singleVariantSchema),
    inventory: inventorySchema,
});
// Optionally, export the schemas if you need to use them elsewhere
exports.default = productZodSchema;
