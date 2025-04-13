
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from "framer-motion";

interface PersonalityQuestionProps {
  question: {
    id: string;
    text: string;
    group: string;
  };
  value: string;
  onChange: (value: string) => void;
}

const PersonalityQuestion = ({ question, value, onChange }: PersonalityQuestionProps) => {
  const options = [
    { value: "Strongly Disagree", label: "Strongly Disagree", emoji: "😠" },
    { value: "Disagree", label: "Disagree", emoji: "🙁" },
    { value: "Slightly Disagree", label: "Slightly Disagree", emoji: "😕" },
    { value: "Neutral", label: "Neutral", emoji: "😐" },
    { value: "Slightly Agree", label: "Slightly Agree", emoji: "🙂" },
    { value: "Agree", label: "Agree", emoji: "😊" },
    { value: "Strongly Agree", label: "Strongly Agree", emoji: "😁" },
  ];

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
        whileHover={{ boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-xl font-medium text-gray-800 mb-6">{question.text}</h3>
        
        <RadioGroup
          value={value}
          onValueChange={onChange}
          className="w-full"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 max-w-full">
            {options.map((option) => (
              <div
                key={option.value}
                className="flex flex-col items-center justify-between h-full"
              >
                <motion.div 
                  className="text-3xl mb-2"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  {option.emoji}
                </motion.div>
                <RadioGroupItem
                  value={option.value}
                  id={`${question.id}-${option.value}`}
                  className={value === option.value ? "border-blue-500 border-2 transition-all duration-200" : "transition-all duration-200"}
                />
                <Label 
                  htmlFor={`${question.id}-${option.value}`}
                  className="text-xs text-center mt-2 transition-all duration-200 leading-tight"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </motion.div>
    </motion.div>
  );
};

export default PersonalityQuestion;
