const LayoutContainer = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between min-h-screen overflow-hidden relative">
      {children}
    </div>
  );
};

export default LayoutContainer;