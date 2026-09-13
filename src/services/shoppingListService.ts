import { ShoppingListItem, Ingredient, CulinaryMasterclass } from '../types';

const SHOPPING_LIST_STORAGE_KEY = 'stassens_culinary_shopping_list_v1';

type Listener = (items: ShoppingListItem[]) => void;
const listeners: Set<Listener> = new Set();

function getStoredItems(): ShoppingListItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SHOPPING_LIST_STORAGE_KEY);
    if (!raw) {
      // Seed default items for culinary inspiration
      const defaults: ShoppingListItem[] = [
        {
          id: 'shop-seed-1',
          name: 'Krokos Kozanis PDO Saffron',
          amount: '1g tin',
          category: 'Rare Spices',
          ingredientId: 'saffron-kozani',
          isArchiveSpecialty: true,
          completed: false,
          notes: 'Source whole uncrushed crimson filaments with PDO seal',
          recipeSource: 'Saffron & Wild Matsutake Acquerello Risotto',
          addedAt: new Date().toISOString()
        },
        {
          id: 'shop-seed-2',
          name: 'Aceto Balsamico Tradizionale di Modena Extravecchio 25yr',
          amount: '100ml flask',
          category: 'Ferments & Vinegars',
          ingredientId: 'aceto-modena',
          isArchiveSpecialty: true,
          completed: false,
          notes: 'DOP certification from Consorzio Produttori',
          addedAt: new Date().toISOString()
        }
      ];
      localStorage.setItem(SHOPPING_LIST_STORAGE_KEY, JSON.stringify(defaults));
      return defaults;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Error loading shopping list:', e);
    return [];
  }
}

function persistItems(items: ShoppingListItem[]): void {
  try {
    localStorage.setItem(SHOPPING_LIST_STORAGE_KEY, JSON.stringify(items));
    listeners.forEach((listener) => listener(items));
  } catch (e) {
    console.error('Error saving shopping list:', e);
  }
}

export const shoppingListService = {
  getItems(): ShoppingListItem[] {
    return getStoredItems();
  },

  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    listener(getStoredItems());
    return () => {
      listeners.delete(listener);
    };
  },

  addIngredient(ingredient: Ingredient, customAmount?: string, notes?: string): ShoppingListItem {
    const items = getStoredItems();
    const existingIndex = items.findIndex((i) => i.ingredientId === ingredient.id || i.name.toLowerCase() === ingredient.name.toLowerCase());

    if (existingIndex > -1) {
      // Item already in list, mark active if was completed
      items[existingIndex].completed = false;
      if (notes) items[existingIndex].notes = notes;
      if (customAmount) items[existingIndex].amount = customAmount;
      persistItems(items);
      return items[existingIndex];
    }

    const newItem: ShoppingListItem = {
      id: `shop-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      name: ingredient.name,
      amount: customAmount || '1 standard atelier measure',
      category: ingredient.category,
      ingredientId: ingredient.id,
      isArchiveSpecialty: true,
      completed: false,
      notes: notes || `Terroir: ${ingredient.origin} (${ingredient.season})`,
      addedAt: new Date().toISOString()
    };

    items.unshift(newItem);
    persistItems(items);
    return newItem;
  },

  addRecipeIngredients(recipe: CulinaryMasterclass): number {
    const items = getStoredItems();
    let countAdded = 0;

    recipe.ingredientsList.forEach((ing) => {
      const exists = items.some((i) => i.name.toLowerCase() === ing.name.toLowerCase());
      if (!exists) {
        items.push({
          id: `shop-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          name: ing.name,
          amount: ing.amount,
          category: ing.isArchiveSpecialty ? 'Archive Rare Specimens' : 'Pantry & Market Supplies',
          isArchiveSpecialty: ing.isArchiveSpecialty,
          completed: false,
          notes: ing.prepState ? `Prep: ${ing.prepState}` : undefined,
          recipeSource: recipe.dishTitle,
          addedAt: new Date().toISOString()
        });
        countAdded++;
      }
    });

    persistItems(items);
    return countAdded;
  },

  addCustomItem(name: string, category: string = 'Custom Pantry Item', amount?: string, notes?: string): ShoppingListItem {
    const items = getStoredItems();
    const newItem: ShoppingListItem = {
      id: `shop-custom-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      name,
      amount: amount || 'As needed',
      category,
      isArchiveSpecialty: false,
      completed: false,
      notes,
      addedAt: new Date().toISOString()
    };
    items.unshift(newItem);
    persistItems(items);
    return newItem;
  },

  toggleCompleted(id: string): void {
    const items = getStoredItems();
    const target = items.find((i) => i.id === id);
    if (target) {
      target.completed = !target.completed;
      persistItems(items);
    }
  },

  updateAmount(id: string, amount: string): void {
    const items = getStoredItems();
    const target = items.find((i) => i.id === id);
    if (target) {
      target.amount = amount;
      persistItems(items);
    }
  },

  removeItem(id: string): void {
    const items = getStoredItems().filter((i) => i.id !== id);
    persistItems(items);
  },

  clearCompleted(): void {
    const items = getStoredItems().filter((i) => !i.completed);
    persistItems(items);
  },

  clearAll(): void {
    persistItems([]);
  },

  isIngredientInList(ingredientIdOrName: string): boolean {
    const items = getStoredItems();
    return items.some(
      (i) =>
        i.ingredientId === ingredientIdOrName ||
        i.name.toLowerCase() === ingredientIdOrName.toLowerCase()
    );
  },

  exportToPlainText(): string {
    const items = getStoredItems();
    if (items.length === 0) return 'Stassen Collection Shopping List is currently empty.';

    const grouped: Record<string, ShoppingListItem[]> = {};
    items.forEach((item) => {
      const cat = item.category || 'General Supplies';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(item);
    });

    let text = `STASSEN'S COLLECTION OF INGREDIENTS — PROVISIONING LIST\n`;
    text += `Generated: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}\n`;
    text += `====================================================\n\n`;

    Object.entries(grouped).forEach(([category, catItems]) => {
      text += `[ ${category.toUpperCase()} ]\n`;
      catItems.forEach((item) => {
        const check = item.completed ? '[x]' : '[ ]';
        const amt = item.amount ? ` (${item.amount})` : '';
        const notes = item.notes ? ` — Note: ${item.notes}` : '';
        const src = item.recipeSource ? ` [Recipe: ${item.recipeSource}]` : '';
        text += `  ${check} ${item.name}${amt}${notes}${src}\n`;
      });
      text += `\n`;
    });

    text += `====================================================\n`;
    text += `Archival Gastronomy & Terroir Provisions\n`;
    return text;
  }
};
