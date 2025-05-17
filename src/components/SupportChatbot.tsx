
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { MessageCircle, X, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useRecipes } from "@/contexts/RecipeContext";
import { Recipe } from "@/contexts/RecipeContext";
import { toast } from "sonner";

type Message = {
  text: string;
  isBot: boolean;
};

type SuggestedQuestion = {
  id: string;
  text: string;
  answer: string;
};

// Sample responses for the chatbot
const botResponses = [
  "You can search for recipes by clicking on 'Find Recipe' in the navigation bar.",
  "To save a recipe, click the bookmark icon on any recipe card. You need to be logged in first.",
  "You can filter recipes by meal type using the filter bar on the Find Recipe page.",
  "Login to access your saved recipes under 'My Saved Recipes'.",
  "Need more help? Contact us through the Contact page.",
];

// Suggested questions that users can click on
const suggestedQuestions: SuggestedQuestion[] = [
  {
    id: "q1",
    text: "How do I find recipes?",
    answer: "You can search for recipes by clicking on 'Find Recipe' in the navigation bar. You can also use filters to narrow down your search by cuisine type, meal type, or dietary restrictions."
  },
  {
    id: "q2",
    text: "How do I save recipes?",
    answer: "To save a recipe, click the bookmark icon or the 'Save Recipe' button on any recipe card. You need to be logged in to save recipes. Your saved recipes will appear in your 'My Saved Recipes' page."
  },
  {
    id: "q3",
    text: "How do I filter recipes?",
    answer: "You can filter recipes by meal type using the filter bar on the Find Recipe page. You can also filter by cuisine type and dietary restrictions using the filter panel."
  },
  {
    id: "q4",
    text: "Where are my saved recipes?",
    answer: "Your saved recipes can be found under the 'My Saved Recipes' page in the navigation menu. You need to be logged in to access your saved recipes."
  }
];

const SupportChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How can I help you with the Recipe App today?", isBot: true },
    { text: "You can click on one of the suggested questions below or type your own question.", isBot: true },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const { isAuthenticated, user, logout } = useAuth();
  const { saveRecipe } = useRecipes();
  
  // Animation variants for the chat window
  const chatVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24,
        duration: 0.4
      } 
    },
    exit: { 
      opacity: 0, 
      y: 20, 
      scale: 0.9,
      transition: { duration: 0.2 } 
    }
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    // Add user message
    const userMessage = { text: currentMessage, isBot: false };
    setMessages([...messages, userMessage]);
    setCurrentMessage("");

    // Simulate bot thinking and response
    setTimeout(() => {
      // Check if message contains "save" and the user is logged in
      if (currentMessage.toLowerCase().includes("save") && isAuthenticated) {
        setMessages((prev) => [...prev, { 
          text: "Would you like to save the current recipe? If you're viewing a recipe, you can click on the 'Save Recipe' button to save it to your collection.", 
          isBot: true 
        }]);
        return;
      }

      // Check if message contains "login" or "account"
      if ((currentMessage.toLowerCase().includes("login") || 
           currentMessage.toLowerCase().includes("account") || 
           currentMessage.toLowerCase().includes("log in")) && 
          !isAuthenticated) {
        setMessages((prev) => [...prev, { 
          text: "You can login by clicking on 'Login' in the navigation bar. For demo purposes, any valid email and password (6+ characters) will work.", 
          isBot: true 
        }]);
        return;
      }
      
      // Get a somewhat relevant response based on keywords or default to a random one
      let botResponse = "";
      const userQuery = currentMessage.toLowerCase();
      
      if (userQuery.includes("recipe") || userQuery.includes("find")) {
        botResponse = botResponses[0];
      } else if (userQuery.includes("save") || userQuery.includes("bookmark")) {
        botResponse = botResponses[1];
      } else if (userQuery.includes("filter") || userQuery.includes("meal")) {
        botResponse = botResponses[2];
      } else if (userQuery.includes("login") || userQuery.includes("account")) {
        botResponse = botResponses[3];
      } else if (userQuery.includes("help") || userQuery.includes("contact")) {
        botResponse = botResponses[4];
      } else {
        // Pick a random response if no keywords match
        botResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      }

      setMessages((prev) => [...prev, { text: botResponse, isBot: true }]);
    }, 600);
  };

  // Handle clicking on a suggested question
  const handleSuggestedQuestion = (question: SuggestedQuestion) => {
    // Add the question as a user message
    setMessages([...messages, { text: question.text, isBot: false }]);
    
    // Simulate bot thinking and response
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: question.answer, isBot: true }]);
    }, 600);
  };

  // Handle save recipe demo function
  const handleSaveRecipeDemo = () => {
    if (!isAuthenticated) {
      toast.error("Please login to save recipes");
      return;
    }
    
    // Demo recipe to save
    const demoRecipe: Recipe = {
      id: "demo-recipe-" + Date.now(),
      title: "Quick Demo Recipe",
      description: "This is a demo recipe saved from the support chatbot",
      ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
      instructions: ["Step 1", "Step 2", "Step 3"],
      prepTime: "10 mins",
      cookTime: "20 mins",
      servings: "2",
      image: "/Wikifoods Images/a33e8ecc-7b76-4198-91d4-81c9e1a4d73a.png",
      mealType: "lunch",
      cuisine: "demo",
      difficulty: "easy",
      dietary: ["vegetarian"],
      cuisineType: ["demo"],
      dietaryRestrictions: ["vegetarian"]
    };
    
    saveRecipe(demoRecipe);
    
    setMessages([
      ...messages, 
      { text: "Save a demo recipe", isBot: false },
      { text: "Demo recipe 'Quick Demo Recipe' has been saved to your collection! You can view it in 'My Saved Recipes'.", isBot: true }
    ]);
    
    toast.success("Demo recipe saved to your collection!");
  };

  return (
    <>
      {/* Chat toggle button - fixed position at bottom right */}
      <Button
        onClick={toggleChatbot}
        className="fixed bottom-5 right-5 rounded-full p-3 bg-orange-500 hover:bg-orange-600 text-white shadow-lg z-50"
        aria-label="Support Chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>

      {/* Chat window with animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={chatVariants}
            className="fixed bottom-20 right-5 z-50"
          >
            <Card className="w-80 md:w-96 shadow-xl">
              <CardHeader className="bg-orange-500 text-white p-3">
                <CardTitle className="text-lg flex justify-between items-center">
                  <span>Recipe App Support</span>
                  {isAuthenticated && (
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                      Logged in as {user?.name}
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80 overflow-y-auto p-4 flex flex-col gap-2">
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.isBot 
                        ? "bg-gray-100 text-left self-start" 
                        : "bg-orange-100 text-right self-end"
                    }`}
                  >
                    {msg.text}
                  </motion.div>
                ))}
              </CardContent>
              <div className="px-4 py-2">
                {/* Suggested Questions */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {suggestedQuestions.map((question) => (
                    <Button
                      key={question.id}
                      variant="outline"
                      size="sm"
                      className="text-xs bg-gray-50 hover:bg-orange-50 text-gray-700"
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      {question.text}
                    </Button>
                  ))}
                </div>
                
                {/* Login/Logout and Save Recipe Demo buttons */}
                {isAuthenticated ? (
                  <div className="flex justify-between mb-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs"
                      onClick={logout}
                    >
                      Log Out
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs flex items-center gap-1"
                      onClick={handleSaveRecipeDemo}
                    >
                      <Save size={14} />
                      Save Demo Recipe
                    </Button>
                  </div>
                ) : (
                  <div className="flex justify-center mb-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs"
                      onClick={() => window.location.href = '/login'}
                    >
                      Login to Enable All Features
                    </Button>
                  </div>
                )}
              </div>
              <CardFooter className="p-2">
                <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                  <Input
                    type="text"
                    placeholder="Type your question..."
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    type="submit" 
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Send
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SupportChatbot;
