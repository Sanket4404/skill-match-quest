
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Results = () => {
  // This is a placeholder for actual data that would come from your assessment
  const [careerResults, setCareerResults] = useState({
    first: "Software Engineer",
    second: "Data Scientist", 
    third: "UX Designer"
  });

  const location = useLocation();
  
  useEffect(() => {
    // In a real app, you would process the assessment data here
    // and calculate the career recommendations
    console.log("Processing assessment data");
    
    // If data is passed via location state, use it
    if (location.state?.skillAnswers && location.state?.personalityAnswers) {
      console.log("Received assessment data:", location.state);
      // Process the data and set career results
      // This is where your ML model would run in a real app
    }
  }, [location]);

  return (
    <div className="min-h-screen w-full bg-cover bg-fixed" 
         style={{ backgroundImage: "url('https://iili.io/bk2duf.md.png')" }}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-6xl font-bold text-center mb-10 underline">RESULTS</h1>
        
        <div className="max-w-lg mx-auto mb-8">
          <h1 className="text-2xl font-bold">
            According to our calculations, the top 3 most suited careers for you are -
          </h1>
        </div>
        
        <div className="flex flex-col items-center space-y-5">
          <div className="bg-[#dc82f0] border-[10px] border-black p-5 text-center w-[360px]">
            <h1 className="font-sans text-2xl font-bold">{careerResults.first}</h1>
          </div>
          
          <div className="bg-[#71cd5c] border-[10px] border-black p-5 text-center w-[300px]">
            <h1 className="text-2xl font-bold">{careerResults.second}</h1>
          </div>
          
          <div className="bg-[#f2c9c9] border-[10px] border-black p-5 text-center w-[240px]">
            <h1 className="text-2xl font-bold">{careerResults.third}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
