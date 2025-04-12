
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Medal, Trophy, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";

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
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-50 to-indigo-100 bg-fixed">
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-center mb-8 text-primary"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
          >
            YOUR CAREER MATCH
          </motion.h1>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground animate-pulse">Analyzing your responses...</p>
              </div>
            </div>
          ) : (
            <>
              <Card className="max-w-2xl mx-auto mb-10 bg-white/90 backdrop-blur-sm shadow-lg border border-primary/10 transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl font-bold text-center text-primary">
                    Your Personalized Career Matches
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-center text-muted-foreground mb-4">
                    Based on your assessment, here are the top careers that match your skills and personality:
                  </p>
                </CardContent>
              </Card>
              
              <motion.div 
                className="flex flex-col items-center space-y-8 max-w-2xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* First result with animation */}
                <motion.div className="w-full transform transition-all duration-500 hover:-translate-y-2" variants={itemVariants}>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="bg-gradient-to-r from-purple-400 to-indigo-500 border-[5px] border-white rounded-xl p-5 text-center shadow-lg flex items-center justify-center cursor-pointer group">
                        <Trophy className="h-10 w-10 mr-4 text-gold transition-transform group-hover:scale-110" />
                        <div>
                          <Badge className="mb-1 bg-white/20 text-white hover:bg-white/30">Perfect Match</Badge>
                          <h1 className="font-sans text-3xl font-bold text-white">{careerResults.first}</h1>
                        </div>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">Top Career Match</h4>
                        <p className="text-sm text-muted-foreground">
                          This career aligns perfectly with your technical skills and personality traits.
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </motion.div>
                
                {/* Second result */}
                <motion.div className="w-[90%] transform transition-all duration-500 hover:-translate-y-2" variants={itemVariants}>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="bg-gradient-to-r from-blue-400 to-blue-600 border-[5px] border-white rounded-xl p-5 text-center shadow-lg flex items-center justify-center cursor-pointer group">
                        <Medal className="h-10 w-10 mr-4 text-silver transition-transform group-hover:scale-110" />
                        <div>
                          <Badge className="mb-1 bg-white/20 text-white hover:bg-white/30">Strong Match</Badge>
                          <h1 className="text-2xl font-bold text-white">{careerResults.second}</h1>
                        </div>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">Second Best Match</h4>
                        <p className="text-sm text-muted-foreground">
                          This career is a strong match for your skills and personality profile.
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </motion.div>
                
                {/* Third result */}
                <motion.div className="w-[80%] transform transition-all duration-500 hover:-translate-y-2" variants={itemVariants}>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="bg-gradient-to-r from-amber-400 to-orange-500 border-[5px] border-white rounded-xl p-5 text-center shadow-lg flex items-center justify-center cursor-pointer group">
                        <Award className="h-10 w-10 mr-4 text-bronze transition-transform group-hover:scale-110" />
                        <div>
                          <Badge className="mb-1 bg-white/20 text-white hover:bg-white/30">Good Match</Badge>
                          <h1 className="text-2xl font-bold text-white">{careerResults.third}</h1>
                        </div>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">Third Best Match</h4>
                        <p className="text-sm text-muted-foreground">
                          This career also aligns well with your assessment results.
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </motion.div>
                
                <motion.div 
                  className="pt-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <p className="italic text-muted-foreground bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-primary/10">
                    These recommendations are based on your unique skills and personality traits.
                  </p>
                </motion.div>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Results;
