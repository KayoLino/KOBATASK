// validação de email
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Validação de nome
export const isValidName = (name: string): boolean => {
    const trimmedName = name.trim();
    return trimmedName.length >= 3 && trimmedName.length <= 100;
};

// Validação de senha
export const isValidPassword = (password: string): boolean => {
    return password.length >= 6;
};

export const sanitizeName = (name: string): string => {
  return name.replace(/[^a-záàâãéèêíïóôõöúçñ\s]/gi, '');
};

// Validação de alteração de senha
export const validatePasswordChange = (currentPassword: string, newPassword: string): string | null => {
    if (newPassword && !currentPassword.trim()) {
        return 'Informe a senha atual para alterar a senha';
    }

    if (newPassword && !isValidPassword(newPassword)) {
        return 'A nova senha deve ter no minimo 6 caracteres';
    }

    return null;
};

// Validação completa do perfil
export const validateProfileData = (name: string, email: string): string | null => {
    if (!isValidName(name)) {
        return 'O nome deve ter entre 3 e 100 caracteres';
    }

    if (!isValidEmail(email)) {
        return 'Email inválido';
    }

    return null;
};