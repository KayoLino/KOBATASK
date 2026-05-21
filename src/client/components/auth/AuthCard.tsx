interface AuthCardProps {
  children: React.ReactNode;
  imageUrl?: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right';
}

const AuthCard = ({ 
  children, 
  imageUrl, 
  imageAlt = 'Auth illustration',
  imagePosition = 'right' 
}: AuthCardProps) => {
  const imageContent = imageUrl && (
    <div className={`hidden md:block ${imagePosition === 'left' ? 'md:w-2/5' : 'md:w-5/12'}`}>
      <img
        src={imageUrl}
        className="w-full h-full object-cover"
        alt={imageAlt}
      />
    </div>
  );

  return (
    <div className="bg-white w-full md:w-4/5 lg:w-3/5 max-w-[1000px] rounded-2xl flex flex-col md:flex-row shadow-lg overflow-hidden bg-opacity-80">
      {imagePosition === 'left' && imageContent}
      <div className={`flex flex-col justify-center p-6 sm:p-8 md:p-10 w-full ${imageUrl ? 'md:w-3/5' : ''}`}>
        {children}
      </div>
      {imagePosition === 'right' && imageContent}
    </div>
  );
};

export default AuthCard;