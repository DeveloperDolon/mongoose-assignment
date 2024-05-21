import { z } from 'zod';

// Define the Zod schema for Order
const orderSchema = z.object({
  email: z.string().email(),
  productId: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
});

export default orderSchema;
