interface PageTitleProps {
  title: string;
  className?: string;
}

const PageTitle = ({ title, className = '' }: PageTitleProps) => {
  return (
    <h1
      className={`font-bold text-white text-4xl md:text-7xl max-w-4xl mx-auto pt-10 md:pb-12 pb-6 ${className}`}
    >
      {title}
    </h1>
  );
};

export default PageTitle;
