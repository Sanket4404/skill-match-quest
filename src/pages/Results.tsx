
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Award, Medal, Trophy, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const Results = () => {
  // This holds our career result data
  const [careerResults, setCareerResults] = useState({
    first: "Software Engineer",
    second: "Data Scientist", 
    third: "UX Designer"
  });
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  
  useEffect(() => {
    // Process assessment data here
    console.log("Processing assessment data");
    
    // If data is passed via location state, use it
    if (location.state?.skillAnswers && location.state?.personalityAnswers) {
      console.log("Received assessment data:", location.state);
      // Simulate API processing time
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } else {
      setIsLoading(false);
    }
  }, [location]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-cover bg-fixed" 
         style={{ backgroundImage: "url('https://iili.io/bk2duf.md.png')" }}>
      <div className="container mx-auto px-4 py-12">
        <motion.h1 
          className="text-6xl font-bold text-center mb-12 underline text-white"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          YOUR CAREER MATCH
        </motion.h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 text-white animate-spin" />
          </div>
        ) : (
          <>
            <Card className="max-w-xl mx-auto mb-10 bg-white/90 backdrop-blur-sm shadow-xl border-none transition-all duration-300 hover:bg-white/95">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                  Based on your assessment, here are your top career matches:
                </h2>
              </CardContent>
            </Card>
            
            <motion.div 
              className="flex flex-col items-center space-y-6 max-w-xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* First result with animation */}
              <motion.div className="w-full transform transition-all duration-500 hover:scale-105" variants={itemVariants}>
                <div className="bg-[#dc82f0] border-[10px] border-black p-5 text-center rounded-lg shadow-[5px_5px_0_0_rgba(0,0,0,0.5)] flex items-center justify-center">
                  <Trophy className="h-8 w-8 mr-3 text-gold" />
                  <h1 className="font-sans text-3xl font-bold">{careerResults.first}</h1>
                </div>
              </motion.div>
              
              {/* Second result */}
              <motion.div className="w-[85%] transform transition-all duration-500 hover:scale-105" variants={itemVariants}>
                <div className="bg-[#71cd5c] border-[10px] border-black p-5 text-center rounded-lg shadow-[5px_5px_0_0_rgba(0,0,0,0.5)] flex items-center justify-center">
                  <Medal className="h-8 w-8 mr-3 text-silver" />
                  <h1 className="text-2xl font-bold">{careerResults.second}</h1>
                </div>
              </motion.div>
              
              {/* Third result */}
              <motion.div className="w-[70%] transform transition-all duration-500 hover:scale-105" variants={itemVariants}>
                <div className="bg-[#f2c9c9] border-[10px] border-black p-5 text-center rounded-lg shadow-[5px_5px_0_0_rgba(0,0,0,0.5)] flex items-center justify-center">
                  <Award className="h-8 w-8 mr-3 text-bronze" />
                  <h1 className="text-2xl font-bold">{careerResults.third}</h1>
                </div>
              </motion.div>
              
              <motion.div 
                className="pt-10 text-center text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <p className="italic text-lg backdrop-blur-sm bg-black/20 p-4 rounded-lg">
                  These recommendations are based on your unique skills and personality traits.
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default Results;
