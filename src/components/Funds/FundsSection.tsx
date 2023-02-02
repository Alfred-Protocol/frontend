import NormalButton from '../Layout/NormalButton';
import PageTitle from '../Layout/PageTitle';
import Fund from './Fund';

const FundsSection = () => {
  return (
    <>
      <PageTitle title="Funds" />
      <div className="flex justify-end space-x-4 items-center pb-6">
        <p className="text-white text-lg">View: </p>
        <NormalButton title="All" />
        <NormalButton title="Managed" />
      </div>
      <div className="flex space-x-2">
        <Fund />
      </div>
      <div className="flex space-x-2 py-4">
        <Fund />
      </div>
    </>
  );
};

export default FundsSection;
