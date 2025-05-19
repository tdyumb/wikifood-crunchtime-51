
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { useRecipes } from "@/contexts/RecipeContext";
import RecipeCard from "@/components/RecipeCard";
import { motion } from "framer-motion";

const RecipeCollection = () => {
  const { recipes } = useRecipes();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        mass: 0.5
      }
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7, 
        ease: [0.22, 1, 0.36, 1]  // Custom easing for smooth movement
      }
    }
  };

  return (
    <div className="min-h-screen bg-wiki-50">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <motion.h1 
            {...fadeInUp}
            className="text-4xl font-bold text-center mb-4"
          >
            Recipe Collection
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center text-gray-600 mb-12 relative"
          >
            <motion.span
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.8, duration: 1.2, ease: "easeInOut" }}
              className="absolute bottom-[-8px] left-0 right-0 mx-auto h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-[80px]"
            />
            Explore our complete collection of delicious recipes
          </motion.p>
          
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {recipes.map((recipe, index) => (
              <motion.div 
                key={recipe.id} 
                variants={item} 
                custom={index} 
                className="h-full flex"
                whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
              >
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
                    difficulty={recipe.difficulty as "easy" | "medium" | "hard" | undefined}
                    sweetness={recipe.sweetness}
                    sourceUrl={recipe.sourceUrl}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCollection;
