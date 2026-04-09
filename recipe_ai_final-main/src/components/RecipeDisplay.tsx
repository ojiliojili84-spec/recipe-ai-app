import { CheckCircle2, ListChecks, UtensilsCrossed } from 'lucide-react';
import type { Recipe } from '../types/recipe';

interface RecipeDisplayProps {
  recipe: Recipe;
}

export default function RecipeDisplay({ recipe }: RecipeDisplayProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden animate-fadeIn">
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-6">
        <div className="flex items-center gap-2 mb-1">
          <UtensilsCrossed className="w-5 h-5 text-amber-100" />
          <span className="text-amber-100 text-xs font-medium uppercase tracking-widest">Your Recipe</span>
        </div>
        <h2 className="text-2xl font-bold text-white">{recipe.recipeName}</h2>
      </div>

      <div className="p-8 space-y-8">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <ListChecks className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-semibold text-stone-700 uppercase tracking-wide text-sm">
              Ingredients
            </h3>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {recipe.ingredients.map((ingredient, i) => (
              <li key={i} className="flex items-center gap-2.5 text-stone-700">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                <span className="text-sm">{ingredient}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="border-t border-stone-100" />

        <section>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-semibold text-stone-700 uppercase tracking-wide text-sm">
              Instructions
            </h3>
          </div>
          <ol className="space-y-4">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-xs font-bold text-amber-600">
                  {i + 1}
                </span>
                <p className="text-stone-700 text-sm leading-relaxed pt-0.5">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
