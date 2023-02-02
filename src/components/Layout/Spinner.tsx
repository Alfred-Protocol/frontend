const Spinner = () => {
  return (
    <div className="inline px-2">
      <div
        className="animate-spin inline-block w-6 h-6 border-4 rounded-full align-[-0.125rem] border-purple-800 border-r-transparent"
        role="status"
      >
        <span className="hidden">Loading...</span>
      </div>
    </div>
  );
};
export default Spinner;
