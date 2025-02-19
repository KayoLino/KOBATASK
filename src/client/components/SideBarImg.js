const SidebarImage = ({ src, alt }) => {
  return (
    <div className="w-full md:w-3/12 hidden md:block">
      <img className="w-full h-full object-cover rounded-lg shadow-md" src={src} alt={alt} />
    </div>
  );
};

export default SidebarImage;