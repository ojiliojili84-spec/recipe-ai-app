import type { GenerateRecipeResponse, GetRecipesResponse } from '../types/recipe';

const BASE_URL = 'https://recipe-backend-w2wp.onrender.com';

export async function generateRecipe(ingredients: string[]): Promise<GenerateRecipeResponse> {
  const response = await fetch(`${BASE_URL}/generate-recipe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ingredients }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to generate recipe' }));
    throw new Error(error.message || 'Failed to generate recipe');
  }

  return response.json();
}

export async function getRecipes(): Promise<GetRecipesResponse> {
  const response = await fetch(`${BASE_URL}/recipes`);

  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }

  return response.json();
}
