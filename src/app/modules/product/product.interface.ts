import { Model } from 'mongoose';

export type InventoryT = {
  quantity: number;
  inStock: boolean;
};

export type SingleVariantsT = {
  type: string;
  value: string;
};

export type ProductT = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: SingleVariantsT[];
  inventory: InventoryT;
};

export type QuantityUpdateMassageT = {
  success: boolean;
  message: string;
};

// for creating static method.......///
export type ProductQuantityUpdate = {
  updateProductQuantity(
    id: string,
    orderQuantity: number,
  ): Promise<QuantityUpdateMassageT | null>;
} & Model<ProductT>;
