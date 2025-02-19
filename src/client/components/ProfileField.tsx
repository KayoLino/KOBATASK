interface ProfileFieldProps {
  label: string;
  value: string;
}

const ProfileField = ({ label, value }: ProfileFieldProps) => {
  return (
    <div className="w-full 2xl:space-y-2">
      <label className="text-lg font-semibold">{label}:</label>
      <p className="w-full 2xl:h-12 p-2 rounded-md border border-gray-300 shadow-md bg-gray-100">
        {value || 'Não informado'}
      </p>
    </div>
  );
};

export default ProfileField;
