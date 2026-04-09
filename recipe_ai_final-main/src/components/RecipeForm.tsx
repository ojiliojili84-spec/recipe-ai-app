import { useState } from 'react';
import { ChefHat, Sparkles } from 'lucide-react';

interface RecipeFormProps {
  onSubmit: (ingredients: string[]) => void;
  isLoading: boolean;
}

export default function RecipeForm({ onSubmit, isLoading }: RecipeFormProps) {
  const [input, setInput] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ingredients = input
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (ingredients.length === 0) return;
    onSubmit(ingredients);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
            <ChefHat className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-stone-800">What's in your kitchen?</h2>
            <p className="text-sm text-stone-500">Enter ingredients and we'll create a recipe</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="ingredients" className="block text-sm font-medium text-stone-700 mb-2">
              Ingredients
            </label>
            <textarea
              id="ingredients"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. chicken, garlic, lemon, rosemary, olive oil"
              rows={3}
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none transition disabled:opacity-60"
            />
            <p className="text-xs text-stone-400 mt-1.5">Separate ingredients with commas</p>
          </div>

          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:bg-stone-200 disabled:text-stone-400 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 active:scale-95 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-4 h-4" />
            {isLoading ? 'Generating...' : 'Generate Recipe'}
          </button>
        </div>
      </div>
    </form>
  );
}
