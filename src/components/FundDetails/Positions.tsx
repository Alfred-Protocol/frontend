import type { LPPosition } from '@/types/type';
import CustomButton from '../Common/CustomButton';
import FundTableList from '../Funds/FundTableList';

interface Props {
  lpPositions: LPPosition[];
}

const Positions = ({ lpPositions }: Props) => {
  return (
    <div className="relative w-full rounded-xl border-2 border-[#EF5DA8] bg-blackfill py-8 px-8 text-left text-white">
      <CustomButton
        title="Add Position"
        type="solidPurple"
        className="absolute right-7 top-0"
        onClick={() => {}}
      />
      <div className="mb-2 text-3xl font-bold">Positions</div>
      <FundTableList data={lpPositions} />
    </div>
  );
};

export default Positions;
