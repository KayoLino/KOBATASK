const ContentContainer = ({ children }) => {
  return (
    <div className="p-8 w-full mx-auto xl:w-10/12 2xl:w-10/12 flex flex-col items-center">
      <div className="flex flex-col items-center rounded-b-3xl p-4 w-full sm:w-3/5 shadow-lg bg-white h-full overflow-y-auto py-8 relative">
        {children}
      </div>
    </div>
  );
};

export default ContentContainer;