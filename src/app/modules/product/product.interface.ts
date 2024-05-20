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
  tags: 'computer' | 'peripherals' | 'wireless' | 'ergonomic';
  variants: Variants;
  inventory: InventoryT;
}
