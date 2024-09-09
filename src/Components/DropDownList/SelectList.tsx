import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectListProps {
  options: Option[];
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SelectList: React.FC<SelectListProps> = ({ options, label, value, onChange, placeholder }) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectList;
