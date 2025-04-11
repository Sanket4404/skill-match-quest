
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-xl font-medium text-gray-800 mb-4">{question.text}</h3>
        
        <RadioGroup
          value={value}
          onValueChange={onChange}
          className="gap-3"
        >
          <div className="flex justify-between gap-2">
            {options.map((option) => (
              <div
                key={option.value}
                className="flex flex-col items-center gap-1 flex-1"
              >
                <div className="text-2xl">{option.emoji}</div>
                <RadioGroupItem
                  value={option.value}
                  id={`${question.id}-${option.value}`}
                  className={value === option.value ? "border-blue-500 border-2" : ""}
                />
                <Label 
                  htmlFor={`${question.id}-${option.value}`}
                  className="text-xs text-center mt-1"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default PersonalityQuestion;
