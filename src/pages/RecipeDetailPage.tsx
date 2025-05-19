
import { useLocation, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { useRecipes } from "@/contexts/RecipeContext";
import { Recipe } from "@/contexts/RecipeContext";
import RecipeCard from "@/components/RecipeCard";
import { useEffect, useState } from "react";
import { formatImageUrl } from "@/utils/imageUtils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const RecipeDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { recipes } = useRecipes();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // First check if recipe was passed via location state
    const stateRecipe = location.state?.recipe;
    if (stateRecipe) {
      setRecipe(stateRecipe);
      setLoading(false);
      return;
    }

    // If not in state, find the recipe from context using the ID
    if (id && recipes) {
      const foundRecipe = recipes.find(r => r.id === id);
      if (foundRecipe) {
        setRecipe(foundRecipe);
      }
    }
    
    setLoading(false);
  }, [id, recipes, location.state]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-wiki-50">
        <Navigation />
        <div className="pt-24 pb-12 px-4 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-wiki-50">
        <Navigation />
        <div className="pt-24 pb-12 px-4 container mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Recipe not found</h1>
            <p className="text-gray-600 mb-8">Sorry, we couldn't find the recipe you're looking for.</p>
            <Button onClick={handleGoBack}>
              <ArrowLeft className="mr-2" size={16} />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-wiki-50">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <Button 
            variant="outline"
            onClick={handleGoBack}
            className="mb-6"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back
          </Button>
          
          <div className="bg-white rounded-lg shadow-md p-6">
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
              difficulty={recipe.difficulty}
              sweetness={recipe.sweetness}
              sourceUrl={recipe.sourceUrl}
              expanded={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
