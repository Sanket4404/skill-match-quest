
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
    { value: "Strongly Disagree", label: "Strongly Disagree" },
    { value: "Disagree", label: "Disagree" },
    { value: "Slightly Disagree", label: "Slightly Disagree" },
    { value: "Neutral", label: "Neutral" },
    { value: "Slightly Agree", label: "Slightly Agree" },
    { value: "Agree", label: "Agree" },
    { value: "Strongly Agree", label: "Strongly Agree" },
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
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Strongly Disagree</span>
            <span>Strongly Agree</span>
          </div>
          
          <div className="flex justify-between gap-2">
            {options.map((option) => (
              <div
                key={option.value}
                className="flex flex-col items-center gap-2 flex-1"
              >
                <RadioGroupItem
                  value={option.value}
                  id={`${question.id}-${option.value}`}
                  className={value === option.value ? "border-blue-500 border-2" : ""}
                />
                <Label 
                  htmlFor={`${question.id}-${option.value}`}
                  className="text-xs text-center"
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
