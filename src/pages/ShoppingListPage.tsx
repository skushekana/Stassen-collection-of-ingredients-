import React, { useState, useEffect } from 'react';
import { ShoppingListItem, Ingredient } from '../types';
import {
  CheckSquare,
  Square,
  Plus,
  Trash2,
  Share2,
  Printer,
  Copy,
  Check,
  ShoppingBag,
  ArrowLeft,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { shoppingListService } from '../services/shoppingListService';

interface ShoppingListPageProps {
  onNavigateToIngredient: (slug: string) => void;
  onNavigateToCollection: () => void;
}

export const ShoppingListPage: React.FC<ShoppingListPageProps> = ({
  onNavigateToIngredient,
  onNavigateToCollection
}) => {
  const [items, setItems] = useState<ShoppingListItem[]>([]);
  const [copiedText, setCopiedText] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Pantry Supplies');

  useEffect(() => {
    const unsub = shoppingListService.subscribe((list) => setItems(list));
    return () => unsub();
  }, []);

  const handleToggle = (id: string) => {
    shoppingListService.toggleCompleted(id);
  };

  const handleRemove = (id: string) => {
    shoppingListService.removeItem(id);
  };

  const handleClearCompleted = () => {
    shoppingListService.clearCompleted();
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all items from your shopping list?')) {
      shoppingListService.clearAll();
    }
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    shoppingListService.addCustomItem(newItemName.trim(), newItemCategory, newItemAmount.trim() || undefined);
    setNewItemName('');
    setNewItemAmount('');
  };

  const handleCopyFormattedText = () => {
    const plainText = shoppingListService.exportToPlainText();
    navigator.clipboard?.writeText(plainText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  // Group items by category
  const groupedItems = items.reduce<Record<string, ShoppingListItem[]>>((acc, item) => {
    const cat = item.category || 'General Supplies';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  const completedCount = items.filter((i) => i.completed).length;

  return (
    <div id="shopping-list-page" className="min-h-screen bg-[#121212] text-[#F5F5F0] pt-24 pb-20 px-4 sm:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-[#F5F5F0]/10">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium block mb-2">
              Culinary Atelier Provisioning
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5F5F0] tracking-tight">
              Shopping List Builder
            </h1>
            <p className="text-xs sm:text-sm text-[#F5F5F0]/60 mt-1">
              Curate and export ingredient provisions directly from recipe masterclasses and botanical dossiers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {items.length > 0 && (
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleCopyFormattedText}
                  className="px-3.5 py-2 text-xs uppercase tracking-wider bg-[#1E1E1E] border border-[#F5F5F0]/15 hover:border-[#C5A059]/50 transition-all flex items-center space-x-2 text-[#F5F5F0]/90"
                >
                  {copiedText ? (
                    <span className="flex items-center space-x-2 text-emerald-400">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied to Clipboard</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-2">
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Text</span>
                    </span>
                  )}
                </button>

                <button
                  onClick={handlePrint}
                  className="px-3.5 py-2 text-xs uppercase tracking-wider bg-[#1E1E1E] border border-[#F5F5F0]/15 hover:border-[#C5A059]/50 transition-all flex items-center space-x-2 text-[#F5F5F0]/90"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print List</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Add Custom Item Box */}
        <form onSubmit={handleAddCustom} className="p-4 sm:p-5 bg-[#181818] border border-[#F5F5F0]/10 mb-8">
          <div className="text-xs uppercase tracking-wider text-[#C5A059] font-medium mb-3 flex items-center space-x-1.5">
            <Plus className="w-3.5 h-3.5" />
            <span>Add Custom Ingredient or Provision</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Ingredient name (e.g. Acquerello Carnaroli Rice, Fresh Chervil)..."
              className="sm:col-span-5 bg-[#222] border border-[#F5F5F0]/15 px-3 py-2 text-xs sm:text-sm text-[#F5F5F0] placeholder-[#F5F5F0]/40 focus:outline-none focus:border-[#C5A059]"
            />

            <input
              type="text"
              value={newItemAmount}
              onChange={(e) => setNewItemAmount(e.target.value)}
              placeholder="Amount (e.g. 500g, 2 bunches)..."
              className="sm:col-span-3 bg-[#222] border border-[#F5F5F0]/15 px-3 py-2 text-xs sm:text-sm text-[#F5F5F0] placeholder-[#F5F5F0]/40 focus:outline-none focus:border-[#C5A059]"
            />

            <select
              value={newItemCategory}
              onChange={(e) => setNewItemCategory(e.target.value)}
              className="sm:col-span-2 bg-[#222] border border-[#F5F5F0]/15 px-2 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#C5A059]"
            >
              <option value="Pantry Supplies">Pantry</option>
              <option value="Fresh Produce">Produce</option>
              <option value="Rare Spices">Spices</option>
              <option value="Dairy & Lipids">Dairy & Fats</option>
              <option value="Cellar Reserves">Cellar</option>
            </select>

            <button
              type="submit"
              className="sm:col-span-2 bg-[#C5A059] text-[#121212] hover:bg-[#d4b066] text-xs uppercase tracking-wider font-medium py-2 transition-all flex items-center justify-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </form>

        {/* Progress & Quick Actions Bar */}
        {items.length > 0 && (
          <div className="flex items-center justify-between text-xs text-[#F5F5F0]/60 mb-6 px-1">
            <span>
              Provisions: <strong className="text-[#C5A059]">{completedCount}</strong> of <strong>{items.length}</strong> items fulfilled
            </span>
            <div className="flex items-center space-x-4">
              {completedCount > 0 && (
                <button
                  onClick={handleClearCompleted}
                  className="text-xs text-[#F5F5F0]/60 hover:text-amber-400 transition-colors"
                >
                  Clear Completed ({completedCount})
                </button>
              )}
              <button
                onClick={handleClearAll}
                className="text-xs text-[#F5F5F0]/40 hover:text-red-400 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        )}

        {/* Shopping List Items by Category */}
        {items.length > 0 ? (
          <div className="space-y-8">
            {(Object.entries(groupedItems) as [string, ShoppingListItem[]][]).map(([category, catItems]) => (
              <div key={category} className="bg-[#181818] border border-[#F5F5F0]/10 overflow-hidden">
                {/* Category Header */}
                <div className="p-3.5 sm:p-4 bg-[#202020] border-b border-[#F5F5F0]/10 flex items-center justify-between">
                  <h3 className="font-serif text-base text-[#F5F5F0] flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                    <span>{category}</span>
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider text-[#F5F5F0]/50">
                    {catItems.filter((i) => i.completed).length} / {catItems.length} checked
                  </span>
                </div>

                {/* Items in Category */}
                <div className="divide-y divide-[#F5F5F0]/5">
                  {catItems.map((item) => (
                    <div
                      key={item.id}
                      className={`p-4 flex items-center justify-between transition-colors ${
                        item.completed ? 'bg-[#141414] opacity-50' : 'hover:bg-[#1E1E1E]'
                      }`}
                    >
                      <div className="flex items-center space-x-3.5 flex-1 cursor-pointer" onClick={() => handleToggle(item.id)}>
                        <button
                          type="button"
                          className="text-[#C5A059] flex-shrink-0"
                          aria-label={item.completed ? "Mark unfulfilled" : "Mark fulfilled"}
                        >
                          {item.completed ? (
                            <CheckSquare className="w-5 h-5" />
                          ) : (
                            <Square className="w-5 h-5 opacity-40 hover:opacity-100" />
                          )}
                        </button>

                        <div>
                          <div className="flex items-center space-x-2">
                            <span className={`text-sm sm:text-base ${item.completed ? 'line-through text-[#F5F5F0]/50' : 'text-[#F5F5F0] font-medium'}`}>
                              {item.name}
                            </span>
                            {item.amount && (
                              <span className="text-xs text-[#C5A059] bg-[#C5A059]/10 px-2 py-0.5 border border-[#C5A059]/20">
                                {item.amount}
                              </span>
                            )}
                          </div>

                          {(item.notes || item.recipeSource) && (
                            <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#F5F5F0]/50 mt-1">
                              {item.recipeSource && (
                                <span className="italic text-[#F5F5F0]/60">For: {item.recipeSource}</span>
                              )}
                              {item.notes && <span>• {item.notes}</span>}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {item.ingredientId && (
                          <button
                            onClick={() => onNavigateToIngredient(item.ingredientId!)}
                            className="p-1.5 text-[#F5F5F0]/40 hover:text-[#C5A059] transition-colors"
                            title="View specimen details"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          onClick={() => handleRemove(item.id)}
                          className="p-1.5 text-[#F5F5F0]/40 hover:text-red-400 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Shopping List Zero State */
          <div className="p-12 text-center bg-[#181818] border border-[#F5F5F0]/10 max-w-xl mx-auto">
            <ShoppingBag className="w-10 h-10 text-[#C5A059]/40 mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-[#F5F5F0] mb-2">Your Shopping List is Empty</h3>
            <p className="text-xs sm:text-sm text-[#F5F5F0]/60 mb-6 leading-relaxed">
              Add ingredients from any specimen dossier or recipe masterclass with a single click to assemble your atelier market provisioning list.
            </p>
            <button
              onClick={onNavigateToCollection}
              className="px-6 py-3 bg-[#C5A059] text-[#121212] font-medium text-xs uppercase tracking-widest hover:bg-[#d4b066] transition-all"
            >
              Browse Specimen Collection
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
