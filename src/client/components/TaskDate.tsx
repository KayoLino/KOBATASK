'use client';

interface TaskDateProps {
  label: string;
  date: string | Date | null;
}

const TaskDate: React.FC<TaskDateProps> = ({ label, date }) => {
  if (!date) return null;

  const formattedDate = new Date(date).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div className="flex w-8/12 items-center flex-col mb-1">
      <p className="text-red-500 text-lg font-semibold mb-1 ">{label}:</p>
      <p className="py-3 mx-4 w-9/12 text-center bg-red-100 px-4 p-2 rounded-full font-semibold">
        {formattedDate}
      </p>
    </div>
  );
};

export default TaskDate;
