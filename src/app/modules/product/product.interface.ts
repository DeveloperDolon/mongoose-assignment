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

// for creating static method.......///
export interface ProductStaticMethodModel extends Model<ProductT> {
  isProductExist(id: string): Promise<ProductT | null>;
}
