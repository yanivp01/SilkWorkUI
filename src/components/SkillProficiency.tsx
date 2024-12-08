import React from 'react';

interface SkillProficiencyProps {
  value: number;
  onChange: (value: number) => void;
}

export function SkillProficiency({ value, onChange }: SkillProficiencyProps) {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((level) => (
        <button
          key={level}
          onClick={() => onChange(level)}
          className={`w-4 h-4 rounded-full ${
            level <= value ? 'bg-orange-500' : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  );
}