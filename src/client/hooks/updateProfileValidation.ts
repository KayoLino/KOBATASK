interface User {
  nome: string;
  email: string;
  imagem_perfil?: string;
}

export const updateProfileValidation = (
  user: User | null,
  name: string,
  email: string,
  newPassword: string,
  previewImage: string | undefined
): boolean => {
  if (name !== user?.nome || email !== user?.email) {
    return true;
  }

  if (newPassword) {
    return true;
  }

  if (previewImage && previewImage !== `http://localhost:8000${user?.imagem_perfil}`) {
    return true;
  }

  return false;
};
