interface PageTitleProps {
  title: string;
  subtitle: string;
}

const PageTitle = ({ title, subtitle }: PageTitleProps) => (
  <div className="text-center mb-4">
    <h1 className="text-lg 2xl:text-2xl font-medium mb-2 xl:mb-4">{title}</h1>
    <p className="text-gray-600 2xl:text-lg">{subtitle}</p>
  </div>
);

export default PageTitle;
