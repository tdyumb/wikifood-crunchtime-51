
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { MessageCircle, X } from "lucide-react";

type Message = {
  text: string;
  isBot: boolean;
};

// Sample responses for the chatbot
const botResponses = [
  "You can search for recipes by clicking on 'Find Recipe' in the navigation bar.",
  "To save a recipe, click the bookmark icon on any recipe card. You need to be logged in first.",
  "You can filter recipes by meal type using the filter bar on the Find Recipe page.",
  "Login to access your saved recipes under 'My Saved Recipes'.",
  "Need more help? Contact us through the Contact page.",
];

const SupportChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How can I help you with the Recipe App today?", isBot: true },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");

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

      {/* Chat window */}
      {isOpen && (
        <Card className="fixed bottom-20 right-5 w-80 md:w-96 shadow-xl z-50">
          <CardHeader className="bg-orange-500 text-white p-3">
            <CardTitle className="text-lg">Recipe App Support</CardTitle>
          </CardHeader>
          <CardContent className="h-80 overflow-y-auto p-4 flex flex-col gap-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.isBot 
                    ? "bg-gray-100 text-left self-start" 
                    : "bg-orange-100 text-right self-end"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </CardContent>
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
      )}
    </>
  );
};

export default SupportChatbot;
