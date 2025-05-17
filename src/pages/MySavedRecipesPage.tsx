
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Bookmark, Trash } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getSavedRecipes, unsaveRecipe, SavedRecipe } from "@/services/recipeService";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const MySavedRecipesPage = () => {
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    // Load saved recipes from localStorage
    const recipes = getSavedRecipes();
    setSavedRecipes(recipes);
  }, [isAuthenticated, navigate]);

  const handleRemoveRecipe = (recipeId: string) => {
    unsaveRecipe(recipeId);
    setSavedRecipes((prev) => prev.filter((recipe) => recipe.id !== recipeId));
    toast.success("Recipe removed from your saved collection");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-grow container mx-auto px-4 py-12 pt-24">
        <div className="flex flex-col items-center justify-center text-center mb-8">
          <Bookmark size={64} className="text-orange-500 mb-4" />
          <h1 className="text-3xl font-bold mb-4">My Saved Recipes</h1>
          {isAuthenticated && user && (
            <p className="text-lg text-muted-foreground mb-6">
              Welcome, {user.name}! Here are all your saved recipes.
            </p>
          )}
        </div>

        {savedRecipes.length === 0 ? (
          <div className="text-center">
            <p className="text-lg text-muted-foreground mb-8">
              You haven't saved any recipes yet. Start exploring and save your favorites!
            </p>
            <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
              <Link to="/find-recipe">Find Recipes</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedRecipes.map((recipe) => (
              <Card key={recipe.id} className="overflow-hidden">
                {recipe.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={recipe.image} 
                      alt={recipe.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{recipe.title}</CardTitle>
                  <CardDescription>
                    Saved on {formatDate(recipe.savedAt)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-muted-foreground">
                    {recipe.description || "No description available"}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/recipe/${recipe.id}`}>View Recipe</Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-500 hover:bg-red-50"
                    onClick={() => handleRemoveRecipe(recipe.id)}
                  >
                    <Trash size={16} className="mr-1" />
                    Remove
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MySavedRecipesPage;
