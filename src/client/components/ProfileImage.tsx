import Image from 'next/image';

interface ProfileImageProps {
  src: string | undefined;
}

const ProfileImage = ({ src }: ProfileImageProps) => {
  const imageUrl = src ? `http://localhost:8000${src}` : "/userProfile/userNotProfile.png";

  return (
    <div className="my-6">
      <Image
        src={imageUrl}
        alt="Foto de perfil"
        width={120}
        height={120}
        className="rounded-full border-4 border-gray-300 shadow-lg w-24 h-24 2xl:w-36 2xl:h-36 object-cover"
      />
    </div>
  );
};

export default ProfileImage;
