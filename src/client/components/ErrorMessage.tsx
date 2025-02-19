interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (!message) return null;

  return (
    <p className="mt-4 p-3 text-center bg-red-100 text-red-600 rounded-md">
      {message}
    </p>
  );
};

export default ErrorMessage;
