import { Model } from 'mongoose';

export interface InventoryT {
  quantity: number;
  inStock: boolean;
}

export interface SingleVariantsT {
  type: string;
  value: string;
}

export interface ProductT {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: SingleVariantsT[];
  inventory: InventoryT;
}

export interface QuantityUpdateMassageT {
  success: boolean;
  message: string;
}

// for creating static method.......///
export interface ProductQuantityUpdate extends Model<ProductT> {
  updateProductQuantity(
    id: string,
    orderQuantity: number,
  ): Promise<QuantityUpdateMassageT | null>;
}
