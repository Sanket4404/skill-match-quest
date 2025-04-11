import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import SkillRating from "@/components/SkillRating";
import PersonalityQuestion from "@/components/PersonalityQuestion";
import { skills, personalityQuestions } from "@/data/questionData";
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [currentSection, setCurrentSection] = useState<'intro' | 'skills' | 'personality' | 'complete'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const [skillAnswers, setSkillAnswers] = useState<Record<string, number>>({});
  const [personalityAnswers, setPersonalityAnswers] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleSkillRatingChange = (id: string, value: number) => {
    setSkillAnswers(prev => ({...prev, [id]: value}));
  };

  const handlePersonalityChange = (id: string, value: string) => {
    setPersonalityAnswers(prev => ({...prev, [id]: value}));
  };

  const startQuestionnaire = () => {
    setCurrentSection('skills');
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
    
    navigate('/results', { 
      state: { 
        skillAnswers, 
        personalityAnswers 
      } 
    });
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

        {currentSection === 'intro' && (
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
                    className="bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 text-white px-8 py-2"
                  >
                    Start Assessment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentSection === 'skills' && (
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
                  className="bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 text-white"
                >
                  Next: Personality Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {currentSection === 'personality' && (
          <Card className="shadow-lg border-blue-200">
            <CardHeader className="bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-t-lg">
              <CardTitle className="text-center text-2xl">Personality Assessment</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <p className="text-gray-700 mb-4">
                  Question {currentQuestion + 1} of {personalityQuestions.length}
                </p>
                <PersonalityQuestion
                  question={personalityQuestions[currentQuestion]}
                  value={personalityAnswers[personalityQuestions[currentQuestion].id] || ""}
                  onChange={(value) => handlePersonalityChange(personalityQuestions[currentQuestion].id, value)}
                />
                <div className="mt-8 flex justify-between">
                  <Button 
                    onClick={handlePrevious} 
                    variant="outline"
                  >
                    Previous
                  </Button>
                  <Button 
                    onClick={handleNext} 
                    className="bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 text-white"
                  >
                    {currentQuestion < personalityQuestions.length - 1 ? "Next Question" : "Submit Assessment"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentSection === 'complete' && (
          <Card className="shadow-lg border-blue-200">
            <CardHeader className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-t-lg">
              <CardTitle className="text-center text-2xl">Assessment Complete!</CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-center">
              <div className="py-10 space-y-6">
                <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900">Thank You for Completing the Assessment</h3>
                <p className="text-gray-700">
                  Your responses have been recorded successfully. Our algorithm is analyzing your skills and personality traits.
                </p>
                <p className="text-gray-700">
                  You will be redirected to your results shortly...
                </p>
                <div className="pt-4 flex justify-center">
                  <Button 
                    onClick={() => navigate('/results', { state: { skillAnswers, personalityAnswers } })}
                    className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white"
                  >
                    View Results Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
