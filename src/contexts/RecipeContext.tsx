
import React, { createContext, useState, useContext } from "react";
import { recipes as initialRecipesData } from "../data/recipes";
import { saveRecipe as saveRecipeService, unsaveRecipe, isRecipeSaved } from "../services/recipeService";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

export interface Recipe {
  id: string;
  title: string;
  description?: string;
  ingredients: string[];
  instructions: string[];
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  image?: string;
  mealType?: string;
  cuisine?: string;
  difficulty?: "easy" | "medium" | "hard";
  dietary?: string[];
  calories?: number;
  cuisineType?: string[];
  dietaryRestrictions?: string[];
}

interface Filters {
  cuisineType: string[];
  mealType: string[];
  dietaryRestrictions: string[];
}

interface RecipeContextType {
  recipes: Recipe[];
  filteredRecipes: Recipe[];
  setFilteredRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
  saveRecipe: (recipe: Recipe) => void;
  unsaveRecipe: (recipeId: string) => void;
  isRecipeSaved: (recipeId: string) => boolean;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipes must be used within a RecipeProvider");
  }
  return context;
};

export const RecipeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recipes] = useState<Recipe[]>(initialRecipesData);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(initialRecipesData);
  const { isAuthenticated } = useAuth();
  const [filters, setFilters] = useState<Filters>({
    cuisineType: [],
    mealType: [],
    dietaryRestrictions: []
  });

  const handleSaveRecipe = (recipe: Recipe) => {
    if (!isAuthenticated) {
      toast.error("Please login to save recipes");
      return;
    }
    
    saveRecipeService(recipe);
    toast.success(`${recipe.title} saved to your collection!`);
  };

  const handleUnsaveRecipe = (recipeId: string) => {
    if (!isAuthenticated) {
      return;
    }
    
    unsaveRecipe(recipeId);
    toast.success("Recipe removed from your collection");
  };

  const checkIfRecipeSaved = (recipeId: string) => {
    return isRecipeSaved(recipeId);
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        filteredRecipes,
        setFilteredRecipes,
        saveRecipe: handleSaveRecipe,
        unsaveRecipe: handleUnsaveRecipe,
        isRecipeSaved: checkIfRecipeSaved,
        filters,
        setFilters,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeContext;
