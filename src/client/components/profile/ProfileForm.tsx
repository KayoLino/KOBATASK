'use client';

import { useState, FormEvent } from 'react';
import InputField from '@/components/common/InputField';
import Button from '@/components/common/Button';
import ImageUploader from '@/components/common/ImageUploader';
import { ErrorMessage } from '@/components/ui';
import { normalizeSpaces, formatEmail } from '@/helpers/formatters';
import { 
  sanitizeName, 
  validateProfileData, 
  validatePasswordChange 
} from '@/utils/validators';
import { ProfileFormData } from '@/types/forms';

interface ProfileFormProps {
  initialData: {
    name: string;
    email: string;
    profileImage?: string;
  };
  onSubmit: (data: ProfileFormData) => Promise<void>;
}

const ProfileForm = ({ initialData, onSubmit }: ProfileFormProps) => {
  const [name, setName] = useState(initialData.name);
  const [email, setEmail] = useState(initialData.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [image, setImage] = useState<File | string | null>(initialData.profileImage || null);
  const [previewImage, setPreviewImage] = useState(initialData.profileImage || '');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const hasChanges = 
    normalizeSpaces(name) !== initialData.name ||
    formatEmail(email) !== initialData.email ||
    newPassword.trim() !== '' ||
    (image instanceof File);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const normalizedName = normalizeSpaces(name);
    const normalizedEmail = formatEmail(email);

    // Validar dados do perfil
    const profileError = validateProfileData(normalizedName, normalizedEmail);
    if (profileError) {
      setError(profileError);
      return;
    }

    // Validar alteração de senha
    const passwordError = validatePasswordChange(currentPassword, newPassword);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    setIsLoading(true);

    try {
      await onSubmit({
        name: normalizedName,
        email: normalizedEmail,
        currentPassword: currentPassword.trim() || undefined,
        newPassword: newPassword.trim() || undefined,
        profileImage: image instanceof File ? image : undefined,
      });
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar perfil');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(sanitizeName(e.target.value));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="flex justify-center">
        <ImageUploader
          image={image}
          setImage={setImage}
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
        />
      </div>

      <InputField
        label="Nome"
        type="text"
        value={name}
        onChange={handleNameChange}
        disabled={isLoading}
        required
        maxLength={100}
      />

      <InputField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
        required
      />

      <InputField
        label="Senha atual"
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        disabled={isLoading}
        placeholder="Deixe em branco para não alterar"
      />

      <InputField
        label="Nova senha"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        disabled={isLoading}
        placeholder="Deixe em branco para não alterar"
        minLength={6}
      />

      {error && <ErrorMessage message={error} />}

      <Button
        type="submit"
        disabled={!hasChanges || isLoading}
        className={
          hasChanges && !isLoading
            ? "w-full px-4 font-semibold py-3 bg-red-500 text-white rounded-3xl hover:bg-red-600 transition"
            : "w-full px-4 font-semibold py-3 bg-red-900 cursor-not-allowed text-gray-400 rounded-3xl transition"
        }
      >
        {isLoading ? 'Salvando...' : 'Salvar alterações'}
      </Button>
    </form>
  );
};

export default ProfileForm;