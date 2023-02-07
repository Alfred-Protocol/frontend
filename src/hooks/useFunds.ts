import type { Fund } from '@prisma/client';
import { useQuery } from 'wagmi';

const getFunds = async () => {
  const res = await fetch('/api/funds');
  return (await res.json()).data;
};

const useFunds = () => {
  return useQuery<Fund[]>(['funds'], getFunds);
};

export default useFunds;
