import React, { useState, useMemo } from 'react';
import { Users, Scale, RotateCcw, ShoppingBag, Check, Sliders } from 'lucide-react';
import { scaleAndConvertAmount, MeasurementSystem, ScaledIngredient } from '../utils/recipeScaling';
import { shoppingListService } from '../services/shoppingListService';

interface RecipeScalerControlProps {
  baseServings?: number;
  ingredients: {
    name: string;
    amount: string;
    prepState: string;
    addedAtMinute: number;
    isArchiveSpecialty: boolean;
  }[];
  recipeTitle: string;
  onScaledChange?: (scaled: ScaledIngredient[], currentServings: number, system: MeasurementSystem) => void;
}

export const RecipeScalerControl: React.FC<RecipeScalerControlProps> = ({
  baseServings = 4,
  ingredients = [],
  recipeTitle,
  onScaledChange
}) => {
  const [servings, setServings] = useState<number>(baseServings || 4);
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [customServingsInput, setCustomServingsInput] = useState<string>(String(baseServings || 4));
  const [measurementSystem, setMeasurementSystem] = useState<MeasurementSystem>('original');
  const [addedToCart, setAddedToCart] = useState<boolean>(false);

  const multiplier = useMemo(() => {
    const base = baseServings && baseServings > 0 ? baseServings : 4;
    return servings / base;
  }, [servings, baseServings]);

  const scaledIngredients = useMemo(() => {
    return ingredients.map(ing => ({
      ...ing,
      amount: scaleAndConvertAmount(ing.amount, multiplier, measurementSystem)
    }));
  }, [ingredients, multiplier, measurementSystem]);

  // Notify parent if callback provided
  React.useEffect(() => {
    if (onScaledChange) {
      onScaledChange(scaledIngredients, servings, measurementSystem);
    }
  }, [scaledIngredients, servings, measurementSystem, onScaledChange]);

  const handlePreset = (s: number) => {
    setServings(s);
    setIsCustomMode(false);
    setCustomServingsInput(String(s));
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomServingsInput(val);
    const num = parseInt(val, 10);
    if (!isNaN(num) && num > 0 && num <= 100) {
      setServings(num);
    }
  };

  const handleReset = () => {
    setServings(baseServings || 4);
    setIsCustomMode(false);
    setCustomServingsInput(String(baseServings || 4));
    setMeasurementSystem('original');
  };

  const handleAddAllToShoppingList = () => {
    scaledIngredients.forEach(ing => {
      shoppingListService.addCustomItem(
        ing.name,
        ing.isArchiveSpecialty ? 'Archive Rare Specimens' : 'Scaled Recipe Items',
        ing.amount,
        `Recipe: ${recipeTitle} (${servings} servings)`
      );
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  return (
    <div className="p-4 rounded-2xl bg-[#1c1c1c] border border-[#C5A059]/30 shadow-xl space-y-4">
      {/* Top Header & Reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2 text-[#C5A059]">
          <Sliders className="w-4 h-4" />
          <span className="font-mono text-xs uppercase tracking-wider font-bold">
            Smart Recipe Scaling & Conversion
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {(servings !== (baseServings || 4) || measurementSystem !== 'original') && (
            <button
              onClick={handleReset}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-black/40 hover:bg-black/70 border border-white/10 text-[10px] font-mono text-neutral-300 transition-colors"
              title="Reset to original recipe"
            >
              <RotateCcw className="w-3 h-3 text-[#C5A059]" />
              <span>Reset</span>
            </button>
          )}

          <button
            onClick={handleAddAllToShoppingList}
            className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-[#C5A059] hover:bg-[#d6b168] text-black text-[10px] font-mono font-bold transition-all shadow"
            title="Add scaled ingredients to shopping list"
          >
            {addedToCart ? (
              <>
                <Check className="w-3 h-3" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3 h-3" />
                <span>Add to Shopping List</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Controls Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Servings Selector */}
        <div>
          <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center justify-between">
            <span className="flex items-center space-x-1">
              <Users className="w-3 h-3 text-[#C5A059]" />
              <span>Yield Servings</span>
            </span>
            <span className="text-[#C5A059] font-bold">{servings} Servings</span>
          </label>

          <div className="flex items-center space-x-1.5 flex-wrap gap-y-1.5">
            {[1, 2, 4, 6, 8].map(s => (
              <button
                key={s}
                onClick={() => handlePreset(s)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all border ${
                  servings === s && !isCustomMode
                    ? 'bg-[#C5A059] text-black border-[#C5A059] font-bold'
                    : 'bg-[#252525] text-neutral-300 border-white/10 hover:border-white/30'
                }`}
              >
                {s}x
              </button>
            ))}

            <button
              onClick={() => setIsCustomMode(true)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all border ${
                isCustomMode
                  ? 'bg-[#C5A059] text-black border-[#C5A059] font-bold'
                  : 'bg-[#252525] text-neutral-300 border-white/10 hover:border-white/30'
              }`}
            >
              Custom
            </button>
          </div>

          {isCustomMode && (
            <div className="mt-2 flex items-center space-x-2">
              <input
                type="number"
                min="1"
                max="50"
                value={customServingsInput}
                onChange={handleCustomChange}
                placeholder="Enter servings..."
                className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-[#C5A059]/50 text-xs font-mono text-white focus:outline-none"
              />
              <span className="text-xs text-neutral-400 font-mono">Portions</span>
            </div>
          )}
        </div>

        {/* Measurement System Toggle */}
        <div>
          <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center space-x-1">
            <Scale className="w-3 h-3 text-[#C5A059]" />
            <span>Measurement System</span>
          </label>

          <div className="grid grid-cols-3 gap-1.5">
            {(['original', 'metric', 'imperial'] as MeasurementSystem[]).map(sys => (
              <button
                key={sys}
                onClick={() => setMeasurementSystem(sys)}
                className={`px-2 py-1.5 rounded-lg text-[11px] font-mono uppercase transition-all border text-center ${
                  measurementSystem === sys
                    ? 'bg-[#C5A059] text-black border-[#C5A059] font-bold'
                    : 'bg-[#252525] text-neutral-300 border-white/10 hover:border-white/30'
                }`}
              >
                {sys}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
