import FundCreateModal from '@/components/Funds/FundCreateModal';
import useFunds from '@/hooks/useFunds';
import { ArrowPathIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import { ArrowDown, ArrowUp } from '../Common/Common';
import CustomButton from '../Common/CustomButton';
import CustomIconButton from '../Common/CustomIconButton';
import FundCard from './FundCard';

enum ViewState {
  CREATION_ASCENDING,
  CREATION_DESCENDING,
}

const FundCards = () => {
  const { data, isLoading } = useFunds();
  const { status } = useAccount();

  const [viewState, setViewState] = useState(ViewState.CREATION_ASCENDING);
  const [showCreateFundModal, setShowCreateFundModal] = useState(false);

  const renderSkeleton = () => {
    return (
      <>
        <div role="status" className="w-50 h-96 animate-pulse">
          <div className="mb-4 h-full w-full rounded-xl bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div role="status" className="w-50 h-96 animate-pulse">
          <div className="mb-4 h-full w-full rounded-xl bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div role="status" className="w-50 h-96 animate-pulse">
          <div className="mb-4 h-full w-full rounded-xl bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div role="status" className="w-50 h-96 animate-pulse">
          <div className="mb-4 h-full w-full rounded-xl bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div role="status" className="w-50 h-96 animate-pulse">
          <div className="mb-4 h-full w-full rounded-xl bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div role="status" className="w-50 h-96 animate-pulse">
          <div className="mb-4 h-full w-full rounded-xl bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="mt-16 mb-10 sm:flex sm:justify-between">
        <div className="sm:flex-5 flex-col space-y-4 sm:flex sm:flex-row sm:space-y-0 sm:space-x-12">
          <CustomButton
            title="Create Fund"
            theme="solidBlue"
            disabled={status !== 'connected'}
            onClick={() => setShowCreateFundModal(true)}
          />
        </div>
        <div className="mt-4 flex space-x-4 sm:mt-0">
          <CustomIconButton
            icon={<ArrowPathIcon width={20} height={20} />}
            className={'px-4'}
            iconDescription={'Refresh'}
          />
          <CustomButton
            title="Choose Start Date"
            theme="transparentPurple"
            onClick={() => {}}
            leftIcon={<CalendarIcon width={20} height={20} />}
          />
          <CustomButton
            title="Choose Mature Date"
            theme="transparentPurple"
            onClick={() => {}}
            leftIcon={<CalendarIcon width={20} height={20} />}
          />
          <CustomButton
            title={
              viewState === ViewState.CREATION_ASCENDING
                ? 'Newest Funds'
                : 'Oldest Funds'
            }
            theme="transparentPurple"
            onClick={() => {
              setViewState((prev) => {
                if (prev === ViewState.CREATION_ASCENDING) {
                  return ViewState.CREATION_DESCENDING;
                }
                return ViewState.CREATION_ASCENDING;
              });
            }}
            rightIcon={
              viewState === ViewState.CREATION_ASCENDING ? (
                <ArrowDown />
              ) : (
                <ArrowUp />
              )
            }
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-y-10 gap-x-7 pb-12 xl:grid-cols-2 2xl:grid-cols-3">
        {isLoading
          ? renderSkeleton()
          : data &&
            data.map((fund) => <FundCard key={fund.address} fund={fund} />)}
      </div>
      <FundCreateModal
        show={showCreateFundModal}
        onClose={() => {
          setShowCreateFundModal(false);
        }}
      />
    </>
  );
};

export default FundCards;
