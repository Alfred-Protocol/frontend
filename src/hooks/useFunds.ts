import FundsFactory from '@/abi/FundsFactory';
import { useContractRead, type Address } from 'wagmi';

const useFunds = () => {
  return useContractRead({
    scopeKey: 'funds',
    address: process.env.FUNDS_FACTORY_MUMBAI_ADDRESS as Address,
    abi: FundsFactory,
    functionName: 'getAllFunds',
    cacheOnBlock: true,
  });
};

export default useFunds;
