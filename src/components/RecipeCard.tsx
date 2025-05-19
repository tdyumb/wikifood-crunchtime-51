import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Clock, Users, Save, ToggleRight, Utensils, Timer, ExternalLink } from "lucide-react";
import { Switch } from "./ui/switch";
import ReviewsDialog from "./ReviewsDialog";
import { reviewsData } from "@/data/reviews";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useRecipes } from "@/contexts/RecipeContext";
import { formatImageUrl } from "@/utils/imageUtils";
import { Link, useNavigate } from "react-router-dom";

interface RecipeCardProps {
  id: string;
  title: string;
  description?: string;
  image?: string;
  prepTime?: string | number;
  cookTime?: string | number;
  servings?: string | number;
  ingredients: string[];
  instructions: string[];
  equipment?: string[];
  difficulty?: string; // Changed from union type to string
  sweetness?: string[];
  sourceUrl?: string;
  expanded?: boolean;
  onViewRecipe?: () => void;
}

interface NutritionalInfo {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
  fiber: string;
}

const RecipeCard = (props: RecipeCardProps) => {
  const recipeReviews = reviewsData.filter(review => review.recipeId === props.id);
  const [keepScreenOn, setKeepScreenOn] = useState(false);
  const { toast } = useToast();
  const { saveRecipe, unsaveRecipe, isRecipeSaved } = useRecipes();
  const navigate = useNavigate();
  
  // Check if recipe is already saved
  const isSaved = isRecipeSaved(props.id);
  
  // This would come from an API or database in a real app
  const getNutritionalInfo = (recipeId: string): NutritionalInfo => {
    // Default nutritional info
    const defaultInfo: NutritionalInfo = {
      calories: 320,
      protein: "12g",
      carbs: "45g",
      fat: "15g", 
      fiber: "6g"
    };
    
    // In a real app, we would have different values for each recipe
    const nutritionalData: Record<string, NutritionalInfo> = {
      "1": { calories: 510, protein: "41g", carbs: "2g", fat: "37g", fiber: "0g" },
      "2": { calories: 259, protein: "13g", carbs: "48g", fat: "3g", fiber: "7g" },
      "3": { calories: 703, protein: "31g", carbs: "80g", fat: "30g", fiber: "8g" },
      "4": { calories: 447, protein: "13g", carbs: "65g", fat: "16g", fiber: "2g" },
      "5": { calories: 703, protein: "31g", carbs: "80g", fat: "30g", fiber: "8g" },
      "6": { calories: 262, protein: "10g", carbs: "26g", fat: "13g", fiber: "4g" },
      "7": { calories: 577, protein: "38g", carbs: "35g", fat: "32g", fiber: "4g" },
      "8": { calories: 176, protein: "10g", carbs: "2g", fat: "14g", fiber: "0g" },
      "9": { calories: 516, protein: "17g", carbs: "43g", fat: "32g", fiber: "2g" },
      "10": { calories: 106, protein: "4g", carbs: "16g", fat: "3g", fiber: "2g" },
      "11": { calories: 280, protein: "16g", carbs: "41g", fat: "8g", fiber: "13g" },
      "12": { calories: 390, protein: "29g", carbs: "49g", fat: "17g", fiber: "4g" },
      "13": { calories: 409, protein: "2g", carbs: "61g", fat: "19g", fiber: "2g" },
      "14": { calories: 217, protein: "3g", carbs: "29g", fat: "11g", fiber: "1g" },
      "15": { calories: 43, protein: "10g", carbs: "5g", fat: "2g", fiber: "0.2g" },
      "16": { calories: 262, protein: "10g", carbs: "26g", fat: "13g", fiber: "4g" }
    };
    
    return nutritionalData[recipeId] || defaultInfo;
  };
  
  const nutritionalInfo = getNutritionalInfo(props.id);
  
  const handleSaveRecipe = () => {
    // If already saved, unsave it
    if (isSaved) {
      unsaveRecipe(props.id);
      toast({
        title: "Recipe Removed",
        description: `${props.title} has been removed from your collection`,
      });
    } else {
      // Save the recipe
      saveRecipe({
        id: props.id,
        title: props.title,
        description: props.description,
        ingredients: props.ingredients,
        instructions: props.instructions,
        prepTime: props.prepTime,
        cookTime: props.cookTime,
        servings: props.servings,
        image: props.image,
        difficulty: props.difficulty,
        equipment: props.equipment,
        sweetness: props.sweetness,
        sourceUrl: props.sourceUrl,
        mealType: "", // Required by type but we don't have it here
        cuisine: "", // Required by type but we don't have it here
      });
      
      toast({
        title: "Recipe Saved!",
        description: `${props.title} has been saved to your collection`,
      });
    }
  };
  
  const handleToggleScreenOn = () => {
    setKeepScreenOn(!keepScreenOn);
    
    if (!keepScreenOn) {
      toast({
        title: "Screen will stay on",
        description: "Your screen will stay on while viewing this recipe",
      });
    } else {
      toast({
        title: "Normal screen behavior restored",
        description: "Your screen will turn off normally",
      });
    }
    
    document.documentElement.classList.toggle("keep-screen-on", !keepScreenOn);
  };

  // New function to handle view recipe button click
  const handleViewRecipe = () => {
    if (props.onViewRecipe) {
      // Use custom handler if provided (for dialogs, etc.)
      props.onViewRecipe();
    } else {
      // Navigate to recipe detail page with the recipe id
      // This creates a recipe detail view with the full expanded recipe
      navigate(`/recipe/${props.id}`, {
        state: { recipe: {
          id: props.id,
          title: props.title,
          description: props.description,
          ingredients: props.ingredients,
          instructions: props.instructions,
          prepTime: props.prepTime,
          cookTime: props.cookTime,
          servings: props.servings,
          image: props.image,
          difficulty: props.difficulty,
          equipment: props.equipment,
          sweetness: props.sweetness,
          sourceUrl: props.sourceUrl,
          mealType: "",
          cuisine: "",
        }}
      });
    }
  };

  // Check for sweetness array with fallback
  const sweetness = props.sweetness || [];
  const equipment = props.equipment || [];

  // Format image URL to use the new folder
  const formattedImageUrl = formatImageUrl(props.image);

  // Show expanded view if expanded prop is true
  if (props.expanded) {
    return (
      <div className="space-y-6">
        <img src={formattedImageUrl} alt={props.title} className="w-full h-64 object-cover rounded-lg" />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Prep Time</p>
            <p className="font-semibold">{props.prepTime}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Cook Time</p>
            <p className="font-semibold">{props.cookTime}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Difficulty</p>
            <p className="font-semibold">{props.difficulty || 'Medium'}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Servings</p>
            <p className="font-semibold">{props.servings}</p>
          </div>
        </div>

        {/* Equipment Section */}
        {equipment.length > 0 && (
          <div className="bg-amber-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-amber-900 mb-2 flex items-center">
              <Utensils className="mr-2" size={20} />
              Equipment Needed
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              {equipment.map((item, index) => (
                <li key={index} className="text-amber-800 flex items-center">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Nutritional Information */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Nutritional Information</h3>
          <div className="grid grid-cols-5 gap-2">
            <div className="text-center p-2">
              <p className="text-sm text-blue-800">Calories</p>
              <p className="font-bold text-blue-900">{nutritionalInfo.calories}</p>
            </div>
            <div className="text-center p-2">
              <p className="text-sm text-blue-800">Protein</p>
              <p className="font-bold text-blue-900">{nutritionalInfo.protein}</p>
            </div>
            <div className="text-center p-2">
              <p className="text-sm text-blue-800">Carbs</p>
              <p className="font-bold text-blue-900">{nutritionalInfo.carbs}</p>
            </div>
            <div className="text-center p-2">
              <p className="text-sm text-blue-800">Fat</p>
              <p className="font-bold text-blue-900">{nutritionalInfo.fat}</p>
            </div>
            <div className="text-center p-2">
              <p className="text-sm text-blue-800">Fiber</p>
              <p className="font-bold text-blue-900">{nutritionalInfo.fiber}</p>
            </div>
          </div>
        </div>

        {sweetness.length > 0 && (
          <div className="flex gap-2">
            {sweetness.map((level, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm"
              >
                {level}
              </span>
            ))}
          </div>
        )}

        <div>
          <h3 className="text-xl font-semibold mb-3">Ingredients</h3>
          <ul className="list-disc list-inside space-y-2">
            {props.ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-700">{ingredient}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Steps</h3>
          <ol className="space-y-4">
            {props.instructions.map((instruction, index) => (
              <li key={index} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full font-semibold">
                  {index + 1}
                </span>
                <p className="text-gray-700">{instruction}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Source Link Section */}
        {props.sourceUrl && (
          <div className="pt-4 mt-2 border-t border-gray-200">
            <div className="flex items-center gap-2 text-gray-600">
              <ExternalLink size={16} />
              <span className="text-sm">Recipe Source:</span>
              <a 
                href={props.sourceUrl} 
                className="text-blue-600 hover:underline text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                {new URL(props.sourceUrl).hostname.replace('www.', '')}
              </a>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Button 
            variant={isSaved ? "default" : "outline"}
            className={`flex-1 ${isSaved ? "bg-orange-500 hover:bg-orange-600" : ""}`}
            onClick={handleSaveRecipe}
          >
            <Save className="mr-2" size={18} />
            {isSaved ? "Saved" : "Save Recipe"}
          </Button>
          
          <ReviewsDialog reviews={recipeReviews} recipeName={props.title} />
        </div>

        <div className="bg-pink-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-pink-900 mb-2">Safety Tips</h3>
          <ul className="space-y-2 text-pink-800">
            <li>• Use oven mitts when handling hot dishes</li>
            <li>• Keep children supervised in the kitchen</li>
            <li>• Ensure all ingredients are fresh and properly stored</li>
          </ul>
        </div>
        
        {/* Keep Screen On Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ToggleRight className={keepScreenOn ? "text-green-500" : "text-gray-400"} />
            <span className="text-sm font-medium">Keep Screen On</span>
          </div>
          <Switch 
            checked={keepScreenOn} 
            onCheckedChange={handleToggleScreenOn} 
          />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
      className="w-full"
    >
      <Card className="w-full hover:shadow-lg transition-shadow overflow-hidden h-full flex flex-col">
        <CardHeader className="p-0">
          <img src={formattedImageUrl} alt={props.title} className="w-full h-48 object-cover" />
        </CardHeader>
        <CardContent className="p-4 flex flex-col flex-grow">
          <CardTitle className="text-xl mb-2">{props.title}</CardTitle>
          <CardDescription className="mb-4">{props.description}</CardDescription>
          
          <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{props.cookTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={16} />
              <span>{props.servings} servings</span>
            </div>
          </div>

          <div className="space-y-2 mt-auto">
            <Button 
              variant="outline" 
              className="w-full"
              style={{ backgroundColor: "#e3dbd5", borderColor: "#e3dbd5" }}
              onClick={handleViewRecipe}
            >
              View Recipe
            </Button>

            <div className="flex gap-2">
              <div className="w-1/2">
                <ReviewsDialog reviews={recipeReviews} recipeName={props.title} />
              </div>
              
              <Button 
                variant={isSaved ? "default" : "outline"}
                size="sm" 
                className={`w-1/2 ${isSaved ? "bg-orange-500 hover:bg-orange-600" : ""}`}
                onClick={handleSaveRecipe}
              >
                <Save className="mr-1" />
                {isSaved ? "Saved" : "Save Recipe"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RecipeCard;
