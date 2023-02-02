import NormalButton from '../Layout/NormalButton';
import PageTitle from '../Layout/PageTitle';

const Funds = () => {
  return (
    <>
      <PageTitle title="Funds" />
      <div className="flex justify-end space-x-4 items-center">
        <p className="text-white text-lg">View: </p>
        <NormalButton title="All" />
        <NormalButton title="Managed" />
      </div>
    </>
  );
};

export default Funds;
