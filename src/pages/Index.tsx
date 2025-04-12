
import { useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { skills, personalityQuestions } from "@/data/questionData";
import { AnimatePresence } from "framer-motion";

// Import our new components
import IntroSection from "@/components/assessment/IntroSection";
import SkillsSection from "@/components/assessment/SkillsSection";
import PersonalitySection from "@/components/assessment/PersonalitySection";
import CompleteSection from "@/components/assessment/CompleteSection";

const Index = () => {
  const [currentSection, setCurrentSection] = useState<'intro' | 'skills' | 'personality' | 'complete'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const [skillAnswers, setSkillAnswers] = useState<Record<string, number>>({});
  const [personalityAnswers, setPersonalityAnswers] = useState<Record<string, string>>({});

  const handleSkillRatingChange = (id: string, value: number) => {
    setSkillAnswers(prev => ({...prev, [id]: value}));
  };

  const handlePersonalityChange = (id: string, value: string) => {
    setPersonalityAnswers(prev => ({...prev, [id]: value}));
  };

  const startQuestionnaire = () => {
    setCurrentSection('skills');
    setProgress(10);
  };

  const moveToPersonality = () => {
    const skillsFilledCount = Object.keys(skillAnswers).length;
    if (skillsFilledCount < skills.length) {
      toast({
        variant: "destructive",
        title: "Please complete all skill ratings",
        description: `You've completed ${skillsFilledCount} out of ${skills.length} skill ratings.`,
      });
      return;
    }
    setCurrentSection('personality');
    setCurrentQuestion(0);
    setProgress(50);
  };

  const handleNext = () => {
    if (currentQuestion < personalityQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setProgress(50 + ((currentQuestion + 1) / personalityQuestions.length) * 50);
    } else {
      submitForm();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setProgress(50 + ((currentQuestion - 1) / personalityQuestions.length) * 50);
    } else {
      setCurrentSection('skills');
      setProgress(50);
    }
  };

  const submitForm = () => {
    toast({
      title: "Assessment Submitted",
      description: "Your responses have been recorded successfully.",
    });
    setCurrentSection('complete');
    setProgress(100);
    console.log("Skill answers:", skillAnswers);
    console.log("Personality answers:", personalityAnswers);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-sky-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center text-sky-900">
            Skill Match Quest
          </h1>
          <p className="text-center text-sky-700 mt-2">Discover your ideal career path based on skills and personality</p>
          <Progress value={progress} className="mt-4 h-2 bg-blue-100" />
        </div>

        <AnimatePresence mode="wait">
          {currentSection === 'intro' && (
            <IntroSection startQuestionnaire={startQuestionnaire} />
          )}

          {currentSection === 'skills' && (
            <SkillsSection 
              skills={skills}
              skillAnswers={skillAnswers}
              handleSkillRatingChange={handleSkillRatingChange}
              moveToPersonality={moveToPersonality}
            />
          )}

          {currentSection === 'personality' && (
            <PersonalitySection 
              currentQuestion={currentQuestion}
              totalQuestions={personalityQuestions.length}
              question={personalityQuestions[currentQuestion]}
              value={personalityAnswers[personalityQuestions[currentQuestion].id] || ""}
              handlePersonalityChange={handlePersonalityChange}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              isLastQuestion={currentQuestion === personalityQuestions.length - 1}
            />
          )}

          {currentSection === 'complete' && (
            <CompleteSection 
              skillAnswers={skillAnswers}
              personalityAnswers={personalityAnswers}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
