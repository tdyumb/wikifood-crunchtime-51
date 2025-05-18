
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { useRecipes } from "@/contexts/RecipeContext";
import RecipeCard from "@/components/RecipeCard";
import { motion } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const RecipeCollection = () => {
  const { recipes } = useRecipes();
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  const handleRecipeClick = (recipeId: string) => {
    setSelectedRecipe(recipeId);
    setDialogOpen(true);
  };

  // Find the selected recipe details
  const selectedRecipeDetails = selectedRecipe 
    ? recipes.find(recipe => recipe.id === selectedRecipe) 
    : null;

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
            Recipe Collection
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center text-gray-600 mb-12"
          >
            Explore our complete collection of delicious recipes
          </motion.p>
          
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {recipes.map((recipe, index) => (
              <motion.div key={recipe.id} variants={item} custom={index} className="h-full flex">
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
                    equipment={recipe.equipment || []}
                    // Convert difficulty to valid type if it's a string
                    difficulty={recipe.difficulty as "easy" | "medium" | "hard" | undefined}
                    sweetness={recipe.sweetness}
                    sourceUrl={recipe.sourceUrl}
                    onViewRecipe={() => handleRecipeClick(recipe.id)}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Recipe Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedRecipeDetails && (
            <div className="p-4">
              <RecipeCard
                id={selectedRecipeDetails.id}
                title={selectedRecipeDetails.title}
                description={selectedRecipeDetails.description}
                image={selectedRecipeDetails.image}
                cookTime={selectedRecipeDetails.cookTime}
                prepTime={selectedRecipeDetails.prepTime}
                servings={selectedRecipeDetails.servings}
                ingredients={selectedRecipeDetails.ingredients}
                instructions={selectedRecipeDetails.instructions}
                equipment={selectedRecipeDetails.equipment || []}
                difficulty={selectedRecipeDetails.difficulty as "easy" | "medium" | "hard" | undefined}
                sweetness={selectedRecipeDetails.sweetness}
                sourceUrl={selectedRecipeDetails.sourceUrl}
                expanded={true}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecipeCollection;
