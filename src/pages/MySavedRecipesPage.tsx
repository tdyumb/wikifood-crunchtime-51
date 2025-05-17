
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Bookmark } from "lucide-react";

const MySavedRecipesPage = () => {
  // Placeholder content - replace with actual saved recipes list later
  const hasSavedRecipes = false; // Simulate no saved recipes initially

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-grow container mx-auto px-4 py-12 pt-24">
        <div className="flex flex-col items-center justify-center text-center">
          <Bookmark size={64} className="text-orange-500 mb-4" />
          <h1 className="text-3xl font-bold mb-4">My Saved Recipes</h1>
          {hasSavedRecipes ? (
            <p className="text-lg text-muted-foreground mb-8">
              Here are all the delicious recipes you've saved.
            </p>
          ) : (
            <>
              <p className="text-lg text-muted-foreground mb-8">
                You haven't saved any recipes yet. Start exploring and save your favorites!
              </p>
              <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
                <Link to="/find-recipe">Find Recipes</Link>
              </Button>
            </>
          )}
          {/* Placeholder for actual saved recipes list */}
          {!hasSavedRecipes && (
            <p className="text-sm text-center text-muted-foreground mt-8">
              Recipe saving functionality will be enabled after Supabase integration and login.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MySavedRecipesPage;
