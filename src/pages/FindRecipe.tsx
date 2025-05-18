
import Navigation from "@/components/Navigation";
import RecipeFilter from "@/components/RecipeFilter";
import RecipeCard from "@/components/RecipeCard";
import MealTypeFilterBar from "@/components/MealTypeFilterBar";
import { useRecipes } from "@/contexts/RecipeContext";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { getEquipmentForRecipe } from "@/utils/recipeUtils";

const FindRecipe = () => {
  const { filteredRecipes, filters } = useRecipes();
  const [searchDescription, setSearchDescription] = useState<string | null>(null);

  // Generate a description based on active filters
  useEffect(() => {
    let description = "";
    
    const cuisineTypes = filters.cuisineType.filter(c => c !== "all");
    const mealTypes = filters.mealType.filter(m => m !== "all" && m.length > 0); 
    const dietaryRestrictions = filters.dietaryRestrictions.filter(d => d !== "all");
    
    if (cuisineTypes.length > 0) {
      description += `${cuisineTypes.join(", ")} cuisine`;
    }
    
    if (mealTypes.length > 0) {
      if (description) description += " - ";
      description += `${mealTypes.join(", ")} recipes`;
    }
    
    if (dietaryRestrictions.length > 0) {
      if (description) description += " - ";
      description += `${dietaryRestrictions.join(", ")} options`;
    }
    
    setSearchDescription(description || null);
  }, [filters]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <div className="min-h-screen bg-wiki-50">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center mb-8"
          >
            Find Your Perfect Recipe
          </motion.h1>
          
          {searchDescription && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center mb-6 bg-white/70 py-2 px-4 rounded-full shadow-sm mx-auto w-fit"
            >
              <Search className="mr-2 h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Showing results for: {searchDescription}</span>
            </motion.div>
          )}
          
          <MealTypeFilterBar />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <RecipeFilter />
          </motion.div>
          
          <motion.div 
            className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            animate="show"
            key={`${filteredRecipes.length}-${JSON.stringify(filters)}`}
          >
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe, index) => (
                <motion.div key={recipe.id} variants={item} className="h-full flex">
                  <div className="w-full">
                    <RecipeCard
                      id={recipe.id}
                      title={recipe.title}
                      description={recipe.description}
                      image={recipe.image}
                      cookTime={recipe.cookTime}
                      prepTime={recipe.prepTime}
                      servings={recipe.servings}
                      ingredients={recipe.ingredients}
                      instructions={recipe.instructions}
                      equipment={getEquipmentForRecipe(recipe.mealType)}
                    />
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                variants={item} 
                className="col-span-full text-center py-12"
              >
                <div className="flex flex-col items-center justify-center space-y-4">
                  <Search size={48} className="text-gray-400" />
                  <h3 className="text-xl font-medium text-gray-600">No recipes match your search</h3>
                  <p className="text-gray-500">Try adjusting your filters or search terms</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FindRecipe;
