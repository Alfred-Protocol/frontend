import type { LPPosition } from '@/types/type';
import { useRouter } from 'next/router';
import { Router } from 'react-router-dom';
import CustomButton from '../Common/CustomButton';
import FundTableList from '../Funds/FundTableList';

interface Props {
  lpPositions: LPPosition[];
}

const Positions = ({ lpPositions }: Props) => {
  const router = useRouter();

  return (
    <div className="relative w-full rounded-xl border-2 border-[#EF5DA8] bg-blackfill py-8 px-8 text-left text-white">
      <CustomButton
        title="Add Position"
        theme="solidPurple"
        className="absolute right-7 top-5"
        onClick={() => {
          router.push(router.asPath + '/manage');
        }}
      />
      <div className="mb-2 text-3xl font-bold">Positions</div>
      <FundTableList data={lpPositions} />
    </div>
  );
};

export default Positions;
