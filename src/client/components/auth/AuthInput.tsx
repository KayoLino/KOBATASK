interface AuthInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
}

const AuthInput = ({
  label,
  type = 'text',
  value,
  onChange,
  disabled = false,
  placeholder,
  autoComplete,
  required = false,
}: AuthInputProps) => {
  return (
    <div className="mb-6">
      <label className="block text-gray-800 font-semibold mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full p-3 border rounded-2xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
      />
    </div>
  );
};

export default AuthInput;