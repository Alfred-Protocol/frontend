import { LPPositionsMock } from '@/mockData/mockData';
import type { LPPosition } from '@/types/type';
import LPPair from './LPPair';

const FundTableList = ({ data = LPPositionsMock }: { data?: LPPosition[] }) => {
  return (
    <div className="rounded-lg shadow">
      <table className="w-full table-auto border-separate -translate-x-3 text-xs [border-spacing:0.75rem]">
        <thead>
          <tr className="translate-y-0 text-grayDark">
            <th className="pb-0">PAIR</th>
            <th className="pb-0">FEE</th>
            <th className="pb-0">MIN</th>
            <th className="pb-0">MAX</th>
            <th className="pb-0">AMOUNTS</th>
          </tr>
        </thead>
        <tbody>
          {data.map((lpPair) => (
            <LPPair key={lpPair?.tokenId?.toString()} {...lpPair} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FundTableList;
