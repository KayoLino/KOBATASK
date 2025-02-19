import Image from "next/image";
import { useEffect } from "react";

const ImageUploader = ({ previewImage, image, setImage, setPreviewImage }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Criando um URL temporário da imagem
    }
  };

  return (
    <div className="my-6 relative group cursor-pointer" onClick={() => document.getElementById('fileInput').click()}>
      <Image
        src={previewImage || image || "/userProfile/userNotProfile.png"}
        alt="Foto de perfil"
        width={120}
        height={120}
        className="rounded-full border-4 border-gray-300 shadow-lg w-24 h-24 2xl:w-36 2xl:h-36 object-cover group-hover:brightness-75 transition"
        unoptimized
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black bg-opacity-50 rounded-full text-white text-sm font-semibold">
        Alterar foto
      </div>
      <input type="file" accept="image/*" id="fileInput" onChange={handleImageChange} className="hidden" />
    </div>
  );
};

export default ImageUploader;
