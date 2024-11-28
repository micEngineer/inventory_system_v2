export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  expirationDate: string;
  category: Category;
  notes?: string;
}

export type Category = 
  | '食料品' // Food
  | '飲料水' // Water
  | '医療品' // Medical
  | '衛生用品' // Hygiene
  | '防災用品' // Emergency Equipment
  | 'その他' // Others

export const CATEGORIES: Category[] = [
  '食料品',
  '飲料水',
  '医療品',
  '衛生用品',
  '防災用品',
  'その他'
];

export interface InventoryFormData {
  name: string;
  quantity: number;
  expirationDate: string;
  category: Category;
  notes?: string;
}