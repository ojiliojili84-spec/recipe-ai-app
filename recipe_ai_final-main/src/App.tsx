import { useState, useEffect } from 'react';
import { ChefHat, AlertCircle, RefreshCw } from 'lucide-react';
import RecipeForm from './components/RecipeForm';
import RecipeDisplay from './components/RecipeDisplay';
import PreviousRecipes from './components/PreviousRecipes';
import LoadingSpinner from './components/LoadingSpinner';
import { generateRecipe, getRecipes } from './api/recipeApi';
import type { Recipe } from './types/recipe';

export default function App() {
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const [previousRecipes, setPreviousRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    setLoadingHistory(true);
    try {
      const data = await getRecipes();
      setPreviousRecipes(data.recipes);
    } catch {
      // silently fail for history load
    } finally {
      setLoadingHistory(false);
    }
  }

  async function handleGenerateRecipe(ingredients: string[]) {
    setIsLoading(true);
    setError(null);
    setCurrentRecipe(null);

    try {
      const data = await generateRecipe(ingredients);
      setCurrentRecipe(data.recipe);
      fetchHistory();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <div className="w-9 h-9 bg-amber-500 rounded-xl flex items-center justify-center shadow-sm">
            <ChefHat className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-stone-900 leading-tight">RecipeAI</h1>
            <p className="text-xs text-stone-500 leading-tight">Powered by OpenAI</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="mb-2">
              <h2 className="text-3xl font-bold text-stone-900 mb-2">
                Turn ingredients into<br />
                <span className="text-amber-500">delicious recipes</span>
              </h2>
              <p className="text-stone-500 text-sm">
                Enter what you have on hand and our AI will craft a complete recipe for you instantly.
              </p>
            </div>

            <RecipeForm onSubmit={handleGenerateRecipe} isLoading={isLoading} />

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-700">Generation failed</p>
                  <p className="text-xs text-red-600 mt-0.5">{error}</p>
                </div>
              </div>
            )}

            {isLoading && <LoadingSpinner />}

            {!isLoading && currentRecipe && <RecipeDisplay recipe={currentRecipe} />}
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-stone-800">Recipe History</h3>
                <button
                  onClick={fetchHistory}
                  disabled={loadingHistory}
                  className="p-1.5 rounded-lg hover:bg-stone-100 transition text-stone-400 hover:text-stone-600 disabled:opacity-50"
                  title="Refresh history"
                >
                  <RefreshCw className={`w-4 h-4 ${loadingHistory ? 'animate-spin' : ''}`} />
                </button>
              </div>
              <div className="max-h-[600px] overflow-y-auto pr-1">
                {loadingHistory ? (
                  <div className="flex justify-center py-8">
                    <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <PreviousRecipes recipes={previousRecipes} />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
