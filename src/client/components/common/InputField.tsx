interface InputFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  maxLength?: number;
  minLength?: number;  
}

const InputField = ({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  className,
  disabled = false,
  placeholder,
  required = false,
  autoComplete,
  maxLength,
  minLength  
}: InputFieldProps) => (
  <div className={`w-full mt-3 2xl:space-y-2 2xl:mt-4 ${className}`}>
    <label className="text-red-500 text-lg font-semibold mb-2">{label}:</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      maxLength={maxLength}
      minLength={minLength}  
      className="w-full 2xl:h-12 p-2 rounded-md border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
    />
  </div>
);

export default InputField;