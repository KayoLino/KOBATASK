const Select = ({ label, options, ...props }) => {
  return (
    <div className="w-full">
      <label className="text-red-500 text-lg font-semibold mb-2 sm:mb-2">{label}</label>
      <select
        className="w-full mt-2 h-10 sm:h-12 p-2 rounded-md border border-gray-300 shadow-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none"
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
