interface TaskProps {
  name: string;
  value: string | null;
}

const TaskName: React.FC<TaskProps> = ({ name, value }) => {
  return (
    <div className="w-full">
      <p className="text-red-500 text-lg font-semibold mb-1">{name}:</p>
      <p className="border-b-2 font-medium">{value}</p>
    </div>
  );
};

export default TaskName;
