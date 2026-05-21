interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="bg-[url('/authImg/bgAuth.jpg')] bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center p-4">
      {children}
    </div>
  );
};

export default AuthLayout;