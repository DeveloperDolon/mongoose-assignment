import { Model } from 'mongoose';

export interface InventoryT {
  quantity: number;
  inStock: boolean;
}

export interface SingleVariantsT {
  type: string;
  value: string;
}

export interface Variants {
  variants: SingleVariantsT[];
}

export interface ProductT {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: Variants;
  inventory: InventoryT;
}

// for creating static method.......///
export interface ProductStaticMethodModel extends Model<ProductT> {
  isProductExist(id: string): Promise<ProductT | null>;
}
