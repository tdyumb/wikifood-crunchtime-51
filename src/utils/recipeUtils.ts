
// Utility functions for recipes

/**
 * Get equipment for a recipe based on meal type
 */
export const getEquipmentForRecipe = (mealType?: string) => {
  // Different equipment based on meal type
  const breakfastEquipment = ["Whisk", "Mixing Bowl", "Spatula", "Frying Pan"];
  const lunchEquipment = ["Knife", "Cutting Board", "Skillet", "Measuring Cups"];
  const dinnerEquipment = ["Pot", "Pan", "Colander", "Wooden Spoon"];
  const dessertEquipment = ["Mixer", "Baking Sheet", "Measuring Spoons", "Oven"];
  
  switch(mealType?.toLowerCase()) {
    case "breakfast":
      return breakfastEquipment;
    case "lunch":
      return lunchEquipment;
    case "dinner":
      return dinnerEquipment;
    case "dessert":
      return dessertEquipment;
    default:
      return ["Bowl", "Whisk", "Baking Sheet", "Measuring Cups"];
  }
};
