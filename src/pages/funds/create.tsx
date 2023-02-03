import FundsFactory from '@/abi/FundsFactory';
import Layout from '@/components/Layout/Layout';
import NormalButton from '@/components/Layout/NormalButton';
import PageTitle from '@/components/Layout/PageTitle';
import {
  MUMBAI_FUNDS_FACTORY_ADDRESS,
  USDC_MUMBAI_ADDRESS,
} from '@/contracts/fundsFactory';
import { BigNumber } from 'ethers';
import { useState } from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

const FundCreate = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [matureDate, setMatureDate] = useState(
    new Date(startDate.getTime() + 1000 * 60 * 60 * 24)
  );

  const { config } = usePrepareContractWrite({
    address: MUMBAI_FUNDS_FACTORY_ADDRESS,
    abi: FundsFactory,
    functionName: 'createNewFund',
    args: [
      USDC_MUMBAI_ADDRESS,
      BigNumber.from(startDate.getTime()),
      BigNumber.from(matureDate.getTime()),
    ],
    enabled: !!startDate && !!matureDate,
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);
  console.log(data, startDate, matureDate);

  return (
    <Layout>
      <PageTitle title="Create Fund" />
      <div className="bg-slate-100 max-w-4xl mx-auto">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-left">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Start Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline text-gray-700"
              type={'date'}
              onChange={(e) => setStartDate(new Date(e.target.value))}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Mature Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type={'date'}
              onChange={(e) => setMatureDate(new Date(e.target.value))}
            />
          </div>
          <div className="flex items-center justify-between">
            <NormalButton
              className="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => write?.()}
            >
              Create
            </NormalButton>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default FundCreate;
