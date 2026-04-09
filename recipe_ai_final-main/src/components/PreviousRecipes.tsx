import { useState } from 'react';
import { Clock, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import type { Recipe } from '../types/recipe';

interface PreviousRecipesProps {
  recipes: Recipe[];
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
  const [expanded, setExpanded] = useState(false);

  const date = recipe.createdAt
    ? new Date(recipe.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <div className="border border-stone-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-stone-50 transition text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-4 h-4 text-amber-500" />
          </div>
          <div>
            <p className="font-medium text-stone-800 text-sm">{recipe.recipeName}</p>
            {date && (
              <div className="flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3 text-stone-400" />
                <span className="text-xs text-stone-400">{date}</span>
              </div>
            )}
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-stone-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-stone-400 flex-shrink-0" />
        )}
      </button>

      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-stone-100 pt-4">
          <div>
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">Ingredients</p>
            <div className="flex flex-wrap gap-2">
              {recipe.ingredients.map((ing, i) => (
                <span key={i} className="px-2.5 py-1 bg-amber-50 text-amber-700 text-xs rounded-full border border-amber-100">
                  {ing}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">Steps</p>
            <ol className="space-y-2">
              {recipe.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-xs text-stone-600">
                  <span className="font-bold text-amber-500 flex-shrink-0">{i + 1}.</span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PreviousRecipes({ recipes }: PreviousRecipesProps) {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-10">
        <BookOpen className="w-10 h-10 text-stone-300 mx-auto mb-3" />
        <p className="text-stone-400 text-sm">No recipes saved yet. Generate your first one above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe._id || recipe.recipeName} recipe={recipe} />
      ))}
    </div>
  );
}
