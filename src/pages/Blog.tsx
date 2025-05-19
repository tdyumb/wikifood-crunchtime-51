
import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";

const Blog = () => {
  const textAnimation = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const spinnerAnimation = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.6, 
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-wiki-50">
      <Navigation />
      <div className="pt-24 pb-12 px-4">
        <motion.div
          className="container mx-auto"
          variants={containerAnimation}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            variants={textAnimation}
            className="text-4xl font-bold text-center mb-4 relative inline-block mx-auto"
          >
            Blog
            <motion.span 
              className="absolute h-1 bg-yellow-400 left-0 right-0 bottom-0"
              initial={{ width: 0, x: '50%' }}
              animate={{ width: '100%', x: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            />
          </motion.h1>
          
          <motion.p 
            variants={textAnimation}
            className="text-center text-gray-600 max-w-lg mx-auto"
          >
            Coming soon! Stay tuned for our latest culinary articles and insights.
          </motion.p>
          
          <motion.div 
            className="mt-16"
            variants={spinnerAnimation}
            initial="initial"
            animate="animate"
          >
            <div className="relative w-28 h-28 mx-auto">
              <div className="absolute inset-0 w-28 h-28 border-4 border-gray-200 rounded-full"></div>
              <motion.div 
                className="absolute inset-0 w-28 h-28 border-4 border-[#ff9933] border-t-transparent rounded-full"
                animate={{ 
                  rotate: 360,
                }}
                transition={{ 
                  duration: 1.5, 
                  ease: "linear", 
                  repeat: Infinity 
                }}
              ></motion.div>
            </div>
            <motion.p 
              className="text-center mt-6 text-[#ff9933] font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Cooking up some great content...
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
