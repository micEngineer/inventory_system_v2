import React, { useState } from 'react';
import { CategoryTab } from './components/CategoryTab';
import { InventoryList } from './components/InventoryList';
import { SearchBar } from './components/SearchBar';
import { Category, InventoryItem, InventoryFormData } from './types/inventory';
import { sampleInventoryItems } from './data/sampleData';
import { filterItems } from './utils/search';
import { ShieldCheck, Plus } from 'lucide-react';
import { InventoryModal } from './components/InventoryModal';

function App() {
  const [items, setItems] = useState<InventoryItem[]>(sampleInventoryItems);
  const [activeCategory, setActiveCategory] = useState<Category>('食料品');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | undefined>();

  const filteredItems = filterItems(items, {
    category: activeCategory,
    searchQuery,
  });

  const handleAddItem = (formData: InventoryFormData) => {
    const newItem: InventoryItem = {
      id: Date.now().toString(),
      ...formData,
    };
    setItems([...items, newItem]);
    setIsModalOpen(false);
  };

  const handleEditItem = (formData: InventoryFormData) => {
    if (!editingItem) return;
    
    setItems(items.map(item => 
      item.id === editingItem.id 
        ? { ...item, ...formData }
        : item
    ));
    setEditingItem(undefined);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('このアイテムを削除してもよろしいですか？')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const openEditModal = (item: InventoryItem) => {
    setEditingItem(item);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ShieldCheck className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">防災備蓄管理</h1>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              新規追加
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          
          <CategoryTab
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          
          <div className="p-6">
            <InventoryList
              items={filteredItems}
              onEditItem={openEditModal}
              onDeleteItem={handleDeleteItem}
            />
          </div>
        </div>
      </main>

      <InventoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddItem}
        title="新規アイテムの追加"
      />

      <InventoryModal
        isOpen={!!editingItem}
        onClose={() => setEditingItem(undefined)}
        onSubmit={handleEditItem}
        initialData={editingItem}
        title="アイテムの編集"
      />
    </div>
  );
}

export default App;