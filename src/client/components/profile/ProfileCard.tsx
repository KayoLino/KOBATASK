import { ReactNode } from 'react';

interface ProfileCardProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const ProfileCard = ({ children, title, subtitle }: ProfileCardProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
        {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        {children}
      </div>
    </div>
  );
};

export default ProfileCard;