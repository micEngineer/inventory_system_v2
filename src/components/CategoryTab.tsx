import React from 'react';
import { Category, CATEGORIES } from '../types/inventory';

interface CategoryTabProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export function CategoryTab({ activeCategory, onCategoryChange }: CategoryTabProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-4 overflow-x-auto py-4" aria-label="カテゴリー">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`
              px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap
              ${
                activeCategory === category
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }
            `}
          >
            {category}
          </button>
        ))}
      </nav>
    </div>
  );
}