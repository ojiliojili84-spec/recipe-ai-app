export interface Recipe {
  _id?: string;
  recipeName: string;
  ingredients: string[];
  steps: string[];
  createdAt?: string;
}

export interface GenerateRecipeRequest {
  ingredients: string[];
}

export interface GenerateRecipeResponse {
  recipe: Recipe;
}

export interface GetRecipesResponse {
  recipes: Recipe[];
}
