import type { LPPosition } from '@/types/type';
import FundTableList from '../Funds/FundTableList';

interface Props {
  lpPositions: LPPosition[];
}

const Positions = ({ lpPositions }: Props) => {
  return (
    <div className="w-full rounded-xl border-2 border-[#EF5DA8] bg-blackfill py-8 px-8 text-left text-white">
      <div className="mb-2 text-3xl font-bold">Positions</div>

      <FundTableList data={lpPositions} />
    </div>
  );
};

export default Positions;
