interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
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
