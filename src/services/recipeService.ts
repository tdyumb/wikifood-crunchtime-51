import { Recipe } from "@/contexts/RecipeContext";

export interface SavedRecipe extends Recipe {
  savedAt: string;
}

export const saveRecipe = (recipe: Recipe): void => {
  const savedRecipes = getSavedRecipes();
  
  // Check if recipe already exists
  if (!savedRecipes.some((r) => r.id === recipe.id)) {
    // Convert values to strings where needed to ensure consistency
    const recipeToSave: SavedRecipe = {
      ...recipe,
      // Convert to string if it's a number, otherwise keep as is
      prepTime: recipe.prepTime !== undefined ? recipe.prepTime.toString() : undefined,
      cookTime: recipe.cookTime !== undefined ? recipe.cookTime.toString() : undefined,
      servings: recipe.servings !== undefined ? recipe.servings.toString() : undefined,
      savedAt: new Date().toISOString(),
    };
    
    savedRecipes.push(recipeToSave);
    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
  }
};

export const unsaveRecipe = (recipeId: string): void => {
  const savedRecipes = getSavedRecipes();
  const updatedRecipes = savedRecipes.filter((recipe) => recipe.id !== recipeId);
  localStorage.setItem("savedRecipes", JSON.stringify(updatedRecipes));
};

export const getSavedRecipes = (): SavedRecipe[] => {
  const saved = localStorage.getItem("savedRecipes");
  return saved ? JSON.parse(saved) : [];
};

export const isRecipeSaved = (recipeId: string): boolean => {
  const savedRecipes = getSavedRecipes();
  return savedRecipes.some((recipe) => recipe.id === recipeId);
};
