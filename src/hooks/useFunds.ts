import type { Fund } from '@prisma/client';
import { useQuery } from 'wagmi';

const getFunds = async (address?: string) => {
  const url = `/api/funds${address ? `?address=${address}` : ''}`;
  const res = await fetch(url);
  return (await res.json()).data;
};

const useFunds = (address?: string) => {
  return useQuery<Fund[]>(['funds'], () => getFunds(address));
};

export default useFunds;
