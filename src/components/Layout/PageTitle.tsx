import { twMerge } from 'tailwind-merge';

interface PageTitleProps {
  title: string;
  className?: string;
}

const PageTitle = ({ title, className = '' }: PageTitleProps) => {
  return (
    <h1
      className={twMerge(
        `mx-auto max-w-4xl pt-10 pb-6 text-4xl font-bold text-fuchsia-50 md:pb-12 md:text-7xl`,
        className
      )}
    >
      {title}
    </h1>
  );
};

export default PageTitle;
