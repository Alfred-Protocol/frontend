import { useMutation, useProvider } from 'wagmi';

const createFund = async (fundData: {
  name: string;
  address: string;
  manager: string;
  description: string;
  startDate: Date;
  matureDate: Date;
}) => {
  const res = await fetch('/api/fund', {
    method: 'POST',
    body: JSON.stringify(fundData),
  });
  return (await res.json()).data;
};

const useCreateFund = () => {
  const provider = useProvider();
  return useMutation(createFund);
};

export default useCreateFund;
