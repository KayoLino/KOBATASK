import Image from 'next/image';

interface ProfileImageProps {
  src?: string;
  size?: 'sm' | 'md' | 'lg';
  editable?: boolean;
}

const ProfileImage = ({ src, size = 'md', editable = false }: ProfileImageProps) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24 2xl:w-36 2xl:h-36',
    lg: 'w-32 h-32 2xl:w-48 2xl:h-48',
  };

  const imageUrl = src || "/userProfile/userNotProfile.png";

  console.log('ProfileImage src:', src);
  console.log('ProfileImage imageUrl:', imageUrl);

  return (
    <div className="relative">
      <Image
        src={imageUrl}
        alt="Foto de perfil"
        width={120}
        height={120}
        className={`rounded-full border-4 border-gray-300 shadow-lg ${sizeClasses[size]} object-cover`}
        unoptimized
      />
      {editable && (
        <div className="absolute bottom-0 right-0 bg-red-500 rounded-full p-2 cursor-pointer hover:bg-red-600 transition">
          {/* Ícone de edição */}
        </div>
      )}
    </div>
  );
};

export default ProfileImage;