
import React, { createContext, useState, useContext, useEffect } from "react";
import { recipes as initialRecipesData } from "../data/recipes";
import { saveRecipe as saveRecipeService, unsaveRecipe, isRecipeSaved } from "../services/recipeService";
import { useAuth } from "./AuthContext";
import { toast } from "@/hooks/use-toast";

export interface Recipe {
  id: string;
  title: string;
  description?: string;
  ingredients: string[];
  instructions: string[];
  prepTime?: number | string;
  cookTime?: number | string;
  servings?: number | string;
  image?: string;
  mealType?: string;
  cuisine?: string;
  // Changed from strict union type to string to accommodate all possible values
  difficulty?: string;
  dietary?: string[];
  calories?: number;
  cuisineType?: string | string[];
  dietaryRestrictions?: string | string[];
  sweetness?: string[];
  sourceUrl?: string;
  equipment?: string[];
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
  
  // Apply filters whenever they change
  useEffect(() => {
    const applyFilters = () => {
      let result = [...recipes];
      
      // Apply cuisine filter
      if (filters.cuisineType.length > 0 && !filters.cuisineType.includes('all')) {
        result = result.filter(recipe => {
          if (Array.isArray(recipe.cuisineType)) {
            return recipe.cuisineType.some(cuisine => 
              filters.cuisineType.includes(cuisine.toLowerCase())
            );
          } else if (typeof recipe.cuisineType === 'string') {
            return filters.cuisineType.includes(recipe.cuisineType.toLowerCase());
          }
          return false;
        });
      }
      
      // Apply meal type filter
      if (filters.mealType.length > 0 && !filters.mealType.includes('all')) {
        result = result.filter(recipe => {
          if (!recipe.mealType) return false;
          return filters.mealType.includes(recipe.mealType.toLowerCase());
        });
      }
      
      // Apply dietary restrictions filter
      if (filters.dietaryRestrictions.length > 0 && !filters.dietaryRestrictions.includes('all')) {
        result = result.filter(recipe => {
          if (Array.isArray(recipe.dietaryRestrictions)) {
            return recipe.dietaryRestrictions.some(restriction => 
              filters.dietaryRestrictions.includes(restriction.toLowerCase())
            );
          } else if (typeof recipe.dietaryRestrictions === 'string') {
            return filters.dietaryRestrictions.includes(recipe.dietaryRestrictions.toLowerCase());
          }
          return false;
        });
      }
      
      setFilteredRecipes(result);
    };
    
    applyFilters();
  }, [filters, recipes]);

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
