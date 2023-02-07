import { twMerge } from 'tailwind-merge';

const Spinner = ({ className = '' }: { className?: string }) => {
  return (
    <div className="inline">
      <div
        className={
          (twMerge(
            `inline-block h-6 w-6 animate-spin rounded-full border-4 border-white border-r-transparent align-[-0.125rem]`
          ),
          className)
        }
        role="status"
      >
        <span className="hidden">Loading...</span>
      </div>
    </div>
  );
};
export default Spinner;
