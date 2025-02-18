export const updateProfileValidation = (user, name, email, currentPassword, newPassword) => {
  if (name !== user?.nome || email !== user?.email) {
    return true;
  }

  if (newPassword) {
    return true;
  }

  return false;
};
