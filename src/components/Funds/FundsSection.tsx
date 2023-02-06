import FundsFactory from '@/abi/FundsFactory';
import { HomeFundsMockData } from '@/mockData/mockData';
import FundCreate from '@/pages/funds/create';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Address, useContractRead } from 'wagmi';
import { ArrowDown, ArrowUp } from '../Common/Common';
import CustomButton from '../Common/CustomButton';
import FundTable from '../FundDetails/FundTable';
import FancyButton from '../Layout/FancyButton';
import NormalButton from '../Layout/NormalButton';
import Fund from './Fund';

enum ViewState {
  ALL,
  MANAGED_BY_USER,
}

const FundsSection = () => {
  const [sortByNewestFund, setSortByNewestFund] = useState(false);
  const { data, isLoading } = useContractRead({
    address: process.env.FUNDS_FACTORY_MUMBAI_ADDRESS as Address,
    abi: FundsFactory,
    functionName: 'getAllFunds',
  });

  const [viewState, setViewState] = useState(ViewState.ALL);

  const [showCreateFundModal, setShowCreateFundModal] = useState(false);

  return (
    <>
      <div className="mt-16 mb-10 sm:flex sm:justify-between">
        <div className="sm:flex-5 flex-col space-y-4 sm:flex sm:flex-row sm:space-y-0 sm:space-x-12">
          <CustomButton
            title="Create Fund"
            type="solidBlue"
            onClick={() => setShowCreateFundModal(true)}
          />
          <CustomButton title="Refresh" type="solidBlue" onClick={() => {}} />
          <CustomButton
            title="Choose Start Date"
            type="transparentPurple"
            onClick={() => {}}
            frontIcon={<CalendarIcon />}
          />
          <CustomButton
            title="Choose Mature Date"
            type="transparentPurple"
            onClick={() => {}}
            frontIcon={<CalendarIcon />}
          />
        </div>
        <div className="sm:flex-3 mt-4 sm:mt-0">
          <CustomButton
            title={sortByNewestFund ? 'Newest Fund' : 'Oldest Fund'}
            type="transparentPurple"
            onClick={() => {
              setSortByNewestFund(!sortByNewestFund);
            }}
            backIcon={sortByNewestFund ? <ArrowDown /> : <ArrowUp />}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-y-10 gap-x-7 pb-12 xl:grid-cols-2 2xl:grid-cols-3">
        {/* {!isLoading &&
          data &&
          data
            // TODO: update once owner has been tied to fund
            // .filter(
            //   (fund) =>
            //     viewState === ViewState.ALL ||
            //     (status === 'connected' &&
            //       fund.toLowerCase() === address.toLowerCase())
            // )
            .map((fund) => (
              <Fund
                key={fund}
                fundAddress={fund}
                manager="0xf23c75Bc0e48Ac25883392D63DA556cB8aF40BA3"
                tokenA="ETH"
                tokenB="USDC"
              />
            ))} */}
        {HomeFundsMockData.map((fund, idx) => {
          return (
            <Fund
              key={idx}
              manager={fund.manager}
              description={fund.description}
              startDate={fund.startDate}
              matureDate={fund.matureDate}
              tvl={fund.tvl}
              tokenA={''}
              tokenB={''}
              fundAddress={fund.fundAddress}
              lpPositions={fund.positions}
              fundName={fund.fundName}
            />
          );
        })}

        {showCreateFundModal && (
          <div className="absolute w-full">
            <FundCreate
              close={() => {
                setShowCreateFundModal(false);
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default FundsSection;
