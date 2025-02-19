const Button = ({ children, onClick, disabled }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-1/2 my-4 px-4 font-semibold py-3 rounded-3xl transition ${disabled ? "bg-red-900 cursor-not-allowed text-gray-400" : "bg-red-500 text-white hover:bg-red-600"
      }`}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;