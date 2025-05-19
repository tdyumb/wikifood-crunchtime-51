
import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

const Events = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const dummyEvents = [
    {
      title: "Pasta Making Workshop",
      date: "June 15, 2024",
      location: "Chicago, IL"
    },
    {
      title: "Summer BBQ Festival",
      date: "July 4, 2024",
      location: "Austin, TX"
    },
    {
      title: "Vegan Cooking Masterclass",
      date: "August 12, 2024",
      location: "Portland, OR"
    }
  ];

  return (
    <div className="min-h-screen bg-wiki-50">
      <Navigation />
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="text-4xl font-bold text-center mb-4 relative inline-block mx-auto"
            >
              Events
              <motion.span 
                className="absolute h-1 bg-yellow-400 left-0 right-0 bottom-0"
                initial={{ width: 0, x: '50%' }}
                animate={{ width: '100%', x: 0 }}
                transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              />
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="text-center text-gray-600 mb-12"
            >
              Join our upcoming cooking events and food festivals.
            </motion.p>

            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              className="max-w-3xl mx-auto grid gap-6"
            >
              {dummyEvents.map((event, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  <div className="flex items-center p-6">
                    <motion.div 
                      className="mr-6 bg-[#ff9933] text-white p-3 rounded-full"
                      whileHover={{ 
                        rotate: [0, -10, 10, -10, 0],
                        transition: { duration: 0.5 }
                      }}
                    >
                      <Calendar />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    >
                      <h3 className="text-xl font-bold">{event.title}</h3>
                      <p className="text-gray-600">{event.date} • {event.location}</p>
                    </motion.div>
                  </div>
                  <motion.div 
                    className="h-1 bg-gradient-to-r from-yellow-300 to-orange-500"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Events;
