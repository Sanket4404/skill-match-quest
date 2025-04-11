
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Award, Medal, Trophy } from "lucide-react";

const Results = () => {
  // This holds our career result data
  const [careerResults, setCareerResults] = useState({
    first: "Software Engineer",
    second: "Data Scientist", 
    third: "UX Designer"
  });

  const location = useLocation();
  
  useEffect(() => {
    // Process assessment data here
    console.log("Processing assessment data");
    
    // If data is passed via location state, use it
    if (location.state?.skillAnswers && location.state?.personalityAnswers) {
      console.log("Received assessment data:", location.state);
      // In a real app, this would process the data and set career results
    }
  }, [location]);

  return (
    <div className="min-h-screen w-full bg-cover bg-fixed" 
         style={{ backgroundImage: "url('https://iili.io/bk2duf.md.png')" }}>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-6xl font-bold text-center mb-12 underline text-white">RESULTS</h1>
        
        <Card className="max-w-xl mx-auto mb-10 bg-white/90 shadow-xl">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-center mb-6">
              According to our calculations, the top 3 most suited careers for you are:
            </h2>
          </CardContent>
        </Card>
        
        <div className="flex flex-col items-center space-y-6 max-w-xl mx-auto">
          {/* First result with animation */}
          <div className="w-full transform transition-all duration-500 hover:scale-105">
            <div className="bg-[#dc82f0] border-[10px] border-black p-5 text-center rounded-lg shadow-[5px_5px_0_0_rgba(0,0,0,0.5)] flex items-center justify-center">
              <Trophy className="h-8 w-8 mr-3 text-yellow-500" />
              <h1 className="font-sans text-3xl font-bold">{careerResults.first}</h1>
            </div>
          </div>
          
          {/* Second result */}
          <div className="w-[85%] transform transition-all duration-500 hover:scale-105">
            <div className="bg-[#71cd5c] border-[10px] border-black p-5 text-center rounded-lg shadow-[5px_5px_0_0_rgba(0,0,0,0.5)] flex items-center justify-center">
              <Medal className="h-8 w-8 mr-3 text-silver" />
              <h1 className="text-2xl font-bold">{careerResults.second}</h1>
            </div>
          </div>
          
          {/* Third result */}
          <div className="w-[70%] transform transition-all duration-500 hover:scale-105">
            <div className="bg-[#f2c9c9] border-[10px] border-black p-5 text-center rounded-lg shadow-[5px_5px_0_0_rgba(0,0,0,0.5)] flex items-center justify-center">
              <Award className="h-8 w-8 mr-3 text-bronze" />
              <h1 className="text-2xl font-bold">{careerResults.third}</h1>
            </div>
          </div>
          
          <div className="pt-10 text-center text-white">
            <p className="italic">These recommendations are based on your assessment responses.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
