
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface IntroSectionProps {
  startQuestionnaire: () => void;
}

const IntroSection = ({ startQuestionnaire }: IntroSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg border-blue-200">
        <CardHeader className="bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-t-lg">
          <CardTitle className="text-center text-2xl">Welcome to Skill Match Quest</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <p className="text-gray-700">
              This assessment will help identify your technical skills and personality traits to recommend suitable career paths.
            </p>
            <p className="text-gray-700">
              The questionnaire consists of two sections:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Technical Skills Assessment - Rate your proficiency in various technical domains</li>
              <li>Personality Assessment - Answer questions about your preferences and behaviors</li>
            </ul>
            <p className="text-gray-700 italic">
              Your honest responses will provide the most accurate results.
            </p>
            <div className="pt-4 flex justify-center">
              <Button 
                onClick={startQuestionnaire} 
                className="bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 text-white px-8 py-2 transition-all duration-300 transform hover:scale-105"
              >
                Start Assessment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default IntroSection;
