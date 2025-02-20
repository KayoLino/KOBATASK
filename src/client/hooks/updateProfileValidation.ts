import { api } from '@/lib/api';
import { User } from '@/types/user';


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

  if (previewImage && previewImage !== `${api}${user?.imagem_perfil}`) {
    return true;
  }

  return false;
};
