const TextArea = ({ label, value, onChange }) => {
  return (
    <div className="w-full mt-3 2xl:space-y-2 2xl:mt-4">
      <label className="text-red-500 text-lg font-semibold mb-2">{label}:</label>
      <textarea
        value={value}
        onChange={onChange}
        className="w-full h-10 2xl:h-20 p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
      />
    </div>
  );
};

export default TextArea;
