const InputField = ({ label, type = "text", value, onChange }) => (
  <div className="w-full mt-3 2xl:space-y-2 2xl:mt-4">
    <label className="text-red-500 text-lg font-semibold mb-2">{label}:</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full 2xl:h-12 p-2 rounded-md border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
    />
  </div>
);

export default InputField;
