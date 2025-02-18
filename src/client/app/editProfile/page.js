'use client'
import Image from "next/image";
import Link from "next/link";
import NavBar from '@/components/Navbar';
import PrivateRoute from '@/components/PrivateRoute';
import LoadingSpinner from '@/components/LoadingSpinner';

import { useRouter } from 'next/navigation';
import axios from "axios";
import { api } from "../../lib/api";
import { useState, useEffect } from 'react';
import { useUser } from '@/hooks/getUser';
import { updateProfileValidation } from '@/hooks/updateProfileValidation';

export default function EditProfile() {

  const { user } = useUser();

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  let checkInputs = updateProfileValidation(user, name, email, currentPassword, newPassword);


  useEffect(() => {
    if (user) {
      setName(user.nome || '');
      setEmail(user.email || '');
      setImage(user.imagem_perfil ? `http://localhost:8000${user.imagem_perfil}` : "/userProfile/userNotProfile.png");
      setLoading(false);
    }
  }, [user]);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("nome", name);
      formData.append("email", email);

      if (currentPassword) {
        formData.append("senhaAtual", currentPassword);
      }


      if (currentPassword && newPassword) {
        formData.append("senhaAtual", currentPassword);
        formData.append("novaSenha", newPassword);
      }

      if (image instanceof File) {
        formData.append("imagem_perfil", image);
      }

      await axios.put(api + "users/update", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Perfil atualizado com sucesso!");
      await router.push('/profile');
    } catch (error) {
      setError(error.response?.data?.errors[0] || "Erro ao atualizar perfil.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <PrivateRoute>
        <NavBar />
        <LoadingSpinner />
      </PrivateRoute>
    );
  }

  return (
    <PrivateRoute>
      <NavBar />
      <div className="flex flex-col md:flex-row justify-between min-h-screen overflow-hidden relative">
        <div className="p-8 w-full mx-auto xl:w-7/12 2xl:w-10/12 flex flex-col items-center">
          <div className="flex flex-col items-center rounded-b-3xl p-4 w-full sm:w-3/5 shadow-lg bg-white h-full overflow-y-auto py-8 relative">

            <Link href="/profile">
              <div className="absolute top-4 left-4 cursor-pointer p-2 text-red-500 text-3xl font-bold hover:text-red-700 transition">
                &lt;
              </div>
            </Link>

            <h1 className="text-lg 2xl:text-2xl font-medium mb-2 xl:mb-4">Edição de Perfil</h1>
            <p className="text-gray-600 2xl:text-lg">Edite seu perfil da melhor forma.</p>

            <div className="my-6 relative group cursor-pointer" onClick={() => document.getElementById('fileInput').click()}>
              <Image
                src={previewImage || image || "/userProfile/userNotProfile.png"}
                alt="Foto de perfil"
                width={120}
                height={120}
                className="rounded-full border-4 border-gray-300 shadow-lg w-24 h-24 2xl:w-36 2xl:h-36 object-cover group-hover:brightness-75 transition "
                unoptimized
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black bg-opacity-50 rounded-full text-white text-sm font-semibold">
                Alterar foto
              </div>
            </div>

            <input
              type="file"
              accept="image/*"
              id="fileInput"
              onChange={handleFile}
              className="hidden"
            />

            <form className="flex justify-center items-center flex-col w-10/12 flex-grow">
              <div className="w-full 2xl:space-y-2">
                <label className="text-sm font-medium mb-2">Nome:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full 2xl:h-12 p-2 rounded-md border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="w-full 2xl:space-y-2 2xl:mt-4">
                <label className="text-sm font-medium mb-2">Email:</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full 2xl:h-12 p-2 rounded-md border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="w-full 2xl:space-y-2 2xl:mt-4">
                <label className="text-sm font-medium mb-2">Senha atual:</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full 2xl:h-12 p-2 rounded-md border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="w-full 2xl:space-y-2 2xl:mt-4">
                <label className="text-sm font-medium mb-2">Nova senha:</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full 2xl:h-12 p-2 rounded-md border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/*   */}

              {checkInputs ?
                <button
                  type="button"
                  onClick={handleUpdateProfile}
                  className="w-1/2 my-4 px-4 font-semibold py-3 bg-red-500 text-white rounded-3xl hover:bg-red-600 transition"
                >
                  Confirmar
                </button> :
                <button
                  type="button"
                  onClick={handleUpdateProfile}
                  className="w-1/2 my-10 px-4 font-semibold py-3 bg-red-900 cursor-not-allowed text-gray-400 rounded-3xl  transition"
                  disabled>
                  Confirmar
                </button>
              }
              {error && (
                <p className="mt-2 p-3 text-center bg-red-100 text-red-600 rounded-md">{error}</p>
              )}
            </form>
          </div>
        </div>
        <div className="w-full md:w-3/12 hidden md:block">
          <img className="w-full h-full object-cover rounded-lg shadow-md" src="/userProfile/profileImg.jpg" alt="Login Illustration" />
        </div>

      </div>
    </PrivateRoute>
  );
}
