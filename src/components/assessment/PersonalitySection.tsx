
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PersonalityQuestion from "@/components/PersonalityQuestion";
import { motion } from "framer-motion";

interface PersonalitySectionProps {
  currentQuestion: number;
  totalQuestions: number;
  question: {
    id: string;
    text: string;
    group: string;
  };
  value: string;
  handlePersonalityChange: (id: string, value: string) => void;
  handlePrevious: () => void;
  handleNext: () => void;
  isLastQuestion: boolean;
}

const PersonalitySection = ({ 
  currentQuestion, 
  totalQuestions,
  question,
  value,
  handlePersonalityChange,
  handlePrevious,
  handleNext,
  isLastQuestion
}: PersonalitySectionProps) => {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full px-4"
    >
      <Card className="shadow-lg border-blue-200 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-t-lg p-6">
          <CardTitle className="text-center text-2xl">Personality Assessment</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-gray-700 font-medium">
                Question {currentQuestion + 1} of {totalQuestions}
              </p>
              <div className="bg-blue-100 rounded-full px-3 py-1">
                <p className="text-sm text-blue-700">
                  {Math.round(((currentQuestion + 1) / totalQuestions) * 100)}% Complete
                </p>
              </div>
            </div>
            
            <PersonalityQuestion
              question={question}
              value={value}
              onChange={(value) => handlePersonalityChange(question.id, value)}
            />
            
            <div className="mt-8 flex justify-between pt-2">
              <Button 
                onClick={handlePrevious} 
                variant="outline"
                className="transition-all duration-200 hover:bg-gray-100"
              >
                Previous
              </Button>
              <Button 
                onClick={handleNext} 
                className="bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 text-white transition-all duration-300 transform hover:scale-105"
              >
                {isLastQuestion ? "Submit Assessment" : "Next Question"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PersonalitySection;
