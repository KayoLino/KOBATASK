interface AuthButtonProps {
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  type?: 'submit' | 'button' | 'reset';
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

const AuthButton = ({
  children,
  isLoading = false,
  loadingText = 'Carregando...',
  disabled = false,
  type = 'submit',
  variant = 'primary',
  onClick,
}: AuthButtonProps) => {
  const baseClasses = 'w-full py-3 mt-6 font-medium rounded-2xl transition disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-red-500 text-white hover:bg-red-600',
    secondary: 'bg-gray-800 text-white hover:bg-gray-700',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {isLoading ? loadingText : children}
    </button>
  );
};

export default AuthButton;