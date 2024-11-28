import { InventoryItem, Category } from '../types/inventory';

interface FilterOptions {
  category: Category;
  searchQuery: string;
}

export function filterItems(
  items: InventoryItem[],
  { category, searchQuery }: FilterOptions
): InventoryItem[] {
  const query = searchQuery.toLowerCase().trim();
  
  return items.filter(item => {
    const matchesCategory = item.category === category;
    
    if (!query) return matchesCategory;
    
    const matchesSearch = 
      item.name.toLowerCase().includes(query) ||
      item.notes?.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);
    
    return matchesCategory && matchesSearch;
  });
}