
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  // State to control the visibility of the splash screen
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    // Set a timeout to trigger the exit animation after 5 seconds
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
      
      // Additional time for exit animation to complete before calling onComplete
      setTimeout(onComplete, 1000);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Enhanced animation variants
  const containerVariants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0, 
      transition: { 
        duration: 1.0, 
        ease: [0.22, 1, 0.36, 1],
        when: "afterChildren" 
      } 
    }
  };
  
  const logoVariants = {
    initial: { opacity: 0, scale: 0.9, y: 10 },
    animate: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        duration: 1.2,
        ease: [0, 0.71, 0.2, 1.01]
      }
    },
    exit: {
      scale: 1.1,
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  // Enhanced shimmer effect with updated color and increased repeats
  const shimmerVariants = {
    initial: { x: '-120%', opacity: 0.2 },
    animate: {
      x: '120%',
      opacity: 0.5,
      transition: { 
        repeat: 10,
        repeatType: 'mirror' as const,
        duration: 2.2,
        ease: "easeInOut",
        delay: 0.5
      }
    }
  };

  const wordEntranceVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 1.5,
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-black via-black to-gray-900"
      initial="initial"
      animate={isSplashVisible ? "animate" : "exit"}
      variants={containerVariants}
      onAnimationComplete={() => !isSplashVisible && onComplete()}
    >
      <div className="relative flex flex-col items-center">
        <motion.div 
          className="relative w-64 h-64 overflow-hidden"
          variants={logoVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <img 
            src="/Wikifoods Images/139e78dd-f344-4f8a-b32c-a0d926fbb889.png" 
            alt="WikiFoods Logo"
            className="w-full h-full object-contain"
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-300 to-transparent"
            variants={shimmerVariants}
            style={{ mixBlendMode: 'overlay' }}
          />
        </motion.div>
        
        <motion.div
          variants={wordEntranceVariants}
          className="mt-6 text-white opacity-80 text-xl tracking-wider"
        >
          Discover • Cook • Enjoy
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
