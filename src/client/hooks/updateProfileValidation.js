export const updateProfileValidation = (user, name, email, currentPassword, newPassword, previewImage) => {
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
