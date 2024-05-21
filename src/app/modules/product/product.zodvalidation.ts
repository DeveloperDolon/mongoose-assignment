import { z } from 'zod';

// Zod schema for InventoryT
const inventorySchema = z.object({
  quantity: z.number().int().positive(),
  inStock: z.boolean().default(true),
});

// Zod schema for SingleVariantsT
const singleVariantSchema = z.object({
  type: z.string(),
  value: z.string(),
});

// Zod schema for ProductT
const productZodSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(singleVariantSchema),
  inventory: inventorySchema,
});

// Optionally, export the schemas if you need to use them elsewhere
export default productZodSchema;
