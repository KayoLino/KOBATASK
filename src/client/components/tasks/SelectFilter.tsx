import React from 'react';

interface SelectFilterProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

const SelectFilter: React.FC<SelectFilterProps> = ({ label, value, options, onChange }) => {
  return (
    <div className="mb-4">
      <label className="text-sm">{label}:</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border p-2 rounded w-full"
      >
        <option value="">Selecione...</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectFilter;
