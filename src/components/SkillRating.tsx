
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface SkillRatingProps {
  skill: {
    id: string;
    name: string;
  };
  value: number;
  onChange: (value: number) => void;
}

const SkillRating = ({ skill, value, onChange }: SkillRatingProps) => {
  const [hoverValue, setHoverValue] = useState(0);
  
  const handleMouseEnter = (rating: number) => {
    setHoverValue(rating);
  };

  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  const handleClick = (rating: number) => {
    onChange(rating);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={skill.id} className="text-base font-medium">
        {skill.name}
      </Label>
      <div className="flex items-center">
        <div className="flex-1 flex justify-between">
          <span className="text-sm text-gray-500">Poor</span>
          <span className="text-sm text-gray-500">Excellent</span>
        </div>
      </div>
      <div className="flex gap-2" onMouseLeave={handleMouseLeave}>
        {[1, 2, 3, 4, 5, 6, 7].map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => handleClick(rating)}
            onMouseEnter={() => handleMouseEnter(rating)}
            className={cn(
              "flex-1 h-12 rounded-md transition-all duration-200",
              (rating <= (hoverValue || value)) 
                ? "bg-gradient-to-r from-blue-400 to-sky-500 shadow-md transform scale-105" 
                : "bg-gray-100 hover:bg-gray-200"
            )}
            aria-label={`Rate ${skill.name} as ${rating} out of 7`}
          >
            <span className="sr-only">{rating}</span>
            <span className={cn(
              "flex justify-center items-center h-full font-medium",
              (rating <= (hoverValue || value)) ? "text-white" : "text-gray-600"
            )}>
              {rating}
            </span>
          </button>
        ))}
      </div>
      <div className="text-sm text-right text-blue-600 font-medium">
        {value > 0 && `Selected rating: ${value}/7`}
      </div>
    </div>
  );
};

export default SkillRating;
