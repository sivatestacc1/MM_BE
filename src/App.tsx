import React, { useState } from 'react';
import { Package, Plus } from 'lucide-react';
import { StockTable } from './components/StockTable';
import { StockForm } from './components/StockForm';
import { StockItem, StockFormData } from './types';

function App() {
  const [items, setItems] = useState<StockItem[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StockItem | null>(null);

  const handleAddItem = (data: StockFormData) => {
    const newItem: StockItem = {
      ...data,
      id: crypto.randomUUID(),
      lastUpdated: new Date().toISOString(),
    };
    setItems([...items, newItem]);
    setIsFormOpen(false);
  };

  const handleEditItem = (data: StockFormData) => {
    if (!editingItem) return;
    const updatedItem: StockItem = {
      ...data,
      id: editingItem.id,
      lastUpdated: new Date().toISOString(),
    };
    setItems(items.map((item) => (item.id === editingItem.id ? updatedItem : item)));
    setEditingItem(null);
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Package className="w-8 h-8 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">Stock Management</h1>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Item
          </button>
        </div>

        {(isFormOpen || editingItem) && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4">
                {editingItem ? 'Edit Item' : 'Add New Item'}
              </h2>
              <StockForm
                onSubmit={editingItem ? handleEditItem : handleAddItem}
                initialData={editingItem || undefined}
                onCancel={() => {
                  setIsFormOpen(false);
                  setEditingItem(null);
                }}
              />
            </div>
          </div>
        )}

        {items.length === 0 ? (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No items</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding a new item.</p>
          </div>
        ) : (
          <StockTable
            items={items}
            onEdit={setEditingItem}
            onDelete={handleDeleteItem}
          />
        )}
      </div>
    </div>
  );
}

export default App;