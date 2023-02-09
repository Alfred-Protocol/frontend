import type { Fund } from '@prisma/client';
import { useQuery } from 'wagmi';

const getFund = async (address?: string) => {
  const res = await fetch(`/fund/${address}`);
  return (await res.json()).data as Fund;
};

const useFund = (address: string) => {
  return useQuery<Fund>(['fund', address], () => getFund(address), {
    enabled: !!address,
  });
};

export default useFund;
