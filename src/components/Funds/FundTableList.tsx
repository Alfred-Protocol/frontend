import { LPPositionsMock } from '@/mockData/mockData';
import type { LPPosition } from '@/types/type';
import LPPair from './LPPair';

type FundTableListProps = {
  data?: LPPosition[];
  showList?: boolean;
};

const FundTableList = ({
  data = LPPositionsMock,
  showList = true,
}: FundTableListProps) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full table-auto border-separate border-spacing-0 text-xs md:table-fixed">
        <thead>
          <tr className="text-grayDark">
            <th className="w-4/12 pb-2">PAIR</th>
            <th className="w-1/12 pb-2">FEE</th>
            <th className="w-2/12 pb-2">MIN</th>
            <th className="w-2/12 pb-2">MAX</th>
            <th className="w-3/12 pb-2">AMOUNTS</th>
          </tr>
        </thead>
        {showList && (
          <tbody>
            {data.map((lpPair) => (
              <LPPair key={lpPair?.tokenId?.toString()} {...lpPair} />
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default FundTableList;
