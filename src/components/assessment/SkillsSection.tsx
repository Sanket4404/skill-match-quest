
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SkillRating from "@/components/SkillRating";
import { motion } from "framer-motion";

interface SkillsSectionProps {
  skills: Array<{ id: string; name: string }>;
  skillAnswers: Record<string, number>;
  handleSkillRatingChange: (id: string, value: number) => void;
  moveToPersonality: () => void;
}

const SkillsSection = ({ 
  skills, 
  skillAnswers, 
  handleSkillRatingChange, 
  moveToPersonality 
}: SkillsSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg border-blue-200">
        <CardHeader className="bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-t-lg">
          <CardTitle className="text-center text-2xl">Technical Skills Assessment</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-700 mb-6">
            Please rate your skills in the following domains on a scale of 1-7, with 1 being 'Poor' and 7 being 'Excellent'.
          </p>
          <div className="space-y-6">
            {skills.map((skill) => (
              <SkillRating
                key={skill.id}
                skill={skill}
                value={skillAnswers[skill.id] || 0}
                onChange={(value) => handleSkillRatingChange(skill.id, value)}
              />
            ))}
          </div>
          <div className="mt-8 flex justify-end">
            <Button 
              onClick={moveToPersonality} 
              className="bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 text-white transition-all duration-300 transform hover:scale-105"
            >
              Next: Personality Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SkillsSection;
