
import Navigation from "@/components/Navigation";
import { QrCode, Apple, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

const Download = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const buttonVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { 
      scale: 1.05, 
      boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 10 
      } 
    },
    tap: { scale: 0.98 }
  };

  const qrCodeVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        delay: 0.5, 
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  const pulseAnimation = {
    animate: {
      boxShadow: ["0px 0px 0px rgba(255,153,51,0)", "0px 0px 20px rgba(255,153,51,0.5)", "0px 0px 0px rgba(255,153,51,0)"],
      transition: { 
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navigation />
      <div className="container mx-auto px-4 py-24">
        <div className="text-center">
          <motion.h1 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-4xl font-bold mb-2 relative inline-block"
          >
            Download Our App
            <motion.span
              className="absolute bottom-0 left-0 h-1 bg-yellow-400"
              initial={{ width: 0, left: "50%" }}
              animate={{ width: '100%', left: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            />
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 mb-12"
          >
            Get our recipe app on your device
          </motion.p>
          
          <motion.div 
            initial="initial"
            animate="animate"
            className="flex flex-col md:flex-row justify-center gap-8 mb-16"
          >
            <motion.button 
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-lg overflow-hidden relative"
            >
              <motion.span
                initial={{ y: "-100%" }}
                whileHover={{ y: "0%" }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 opacity-0 hover:opacity-100"
                style={{ mixBlendMode: "overlay" }}
              />
              <Apple className="w-6 h-6" />
              Download for iOS
            </motion.button>
            
            <motion.button 
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-lg overflow-hidden relative"
            >
              <motion.span
                initial={{ y: "-100%" }}
                whileHover={{ y: "0%" }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 opacity-0 hover:opacity-100"
                style={{ mixBlendMode: "overlay" }}
              />
              <Smartphone className="w-6 h-6" />
              Download for Android
            </motion.button>
          </motion.div>
          
          <motion.div 
            variants={qrCodeVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="flex justify-center"
          >
            <motion.div 
              className="p-8 bg-white rounded-lg shadow-lg relative"
              variants={pulseAnimation}
              animate="animate"
            >
              <motion.div
                animate={{
                  rotate: [0, 0, 5, -5, 0],
                  scale: [1, 1.02, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                <QrCode className="w-40 h-40 mx-auto mb-4 text-gray-800" />
              </motion.div>
              <motion.p 
                className="text-gray-600 font-medium"
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                Scan to download
              </motion.p>
              <motion.div
                className="absolute inset-0 rounded-lg"
                initial={{ borderWidth: 0 }}
                animate={{ borderWidth: 2 }}
                style={{ borderColor: "#ff9933" }}
                transition={{ duration: 1, delay: 1 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Download;
