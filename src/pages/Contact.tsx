
import Navigation from "@/components/Navigation";
import ContactForm from "@/components/ContactForm";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    { icon: <Mail className="h-6 w-6" />, text: "info@wikifoods.com" },
    { icon: <Phone className="h-6 w-6" />, text: "(555) 123-4567" },
    { icon: <MapPin className="h-6 w-6" />, text: "123 Cooking St, Foodville, CA" }
  ];

  const headlineVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="min-h-screen bg-wiki-50">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <motion.h1 
            variants={headlineVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl font-bold text-center mb-4 relative inline-block mx-auto"
          >
            Contact Us
            <motion.span
              className="absolute bottom-0 left-0 h-1 bg-yellow-400"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            />
          </motion.h1>
          
          <motion.p 
            variants={headlineVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="text-center text-gray-600 mb-12"
          >
            Have questions or feedback? We'd love to hear from you!
          </motion.p>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto"
          >
            <motion.div 
              variants={itemVariants}
              className="md:w-1/3"
            >
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-md"
                whileHover={{
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  y: -5,
                  transition: { duration: 0.3 }
                }}
              >
                <h3 className="text-xl font-bold mb-6">Get In Touch</h3>
                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + (index * 0.15), duration: 0.6 }}
                      className="flex items-center gap-3 text-gray-600 group"
                    >
                      <motion.div 
                        className="text-[#ff9933] transition-transform"
                        whileHover={{
                          scale: 1.2,
                          rotate: [0, -5, 5, -5, 0],
                          transition: { duration: 0.5 }
                        }}
                      >
                        {item.icon}
                      </motion.div>
                      <span className="group-hover:text-[#ff9933] transition-colors duration-300">
                        {item.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="md:w-2/3"
            >
              <ContactForm />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
