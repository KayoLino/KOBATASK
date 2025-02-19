interface ButtonProps {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
  className?: string; // Adicione esta linha para permitir className
}

const Button = ({ onClick, disabled, children, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  );
};

export default Button;
