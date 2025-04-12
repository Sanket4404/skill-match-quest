
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

interface CompleteSectionProps {
  skillAnswers: Record<string, number>;
  personalityAnswers: Record<string, string>;
}

const CompleteSection = ({ skillAnswers, personalityAnswers }: CompleteSectionProps) => {
  const navigate = useNavigate();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg border-blue-200">
        <CardHeader className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-t-lg">
          <CardTitle className="text-center text-2xl">Assessment Complete!</CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <div className="py-10 space-y-6">
            <motion.div 
              className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h3 className="text-xl font-medium text-gray-900">Thank You for Completing the Assessment</h3>
            <p className="text-gray-700">
              Your responses have been recorded successfully. Our algorithm is analyzing your skills and personality traits.
            </p>
            <motion.p 
              className="text-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              You will be redirected to your results shortly...
            </motion.p>
            <div className="pt-4 flex justify-center">
              <Button 
                onClick={() => navigate('/results', { state: { skillAnswers, personalityAnswers } })}
                className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white transition-all duration-300 transform hover:scale-105"
              >
                View Results Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CompleteSection;
