'use client';

interface TaskInfoProps {
  label: string;
  value: string | null;
}

const TaskInfo: React.FC<TaskInfoProps> = ({ label, value }) => {
  if (!value) return null;

  return (
    <div className="flex w-1/2 items-center flex-col">
      <p className="text-red-500 text-lg font-semibold mb-1">{label}:</p>
      <p className="py-3 mx-4 w-9/12 text-center bg-red-100 px-4 p-2 rounded-full font-semibold">
        {value}
      </p>
    </div>
  );
};

export default TaskInfo;
