import { LPPositionsMock } from '@/mockData/mockData';
import type { LPPosition } from '@/types/type';
import LPPair from './LPPair';

const FundTableList = ({ data = LPPositionsMock }: { data?: LPPosition[] }) => {
  return (
    <table className="w-full table-fixed border-separate -translate-x-3 overflow-x-auto text-xs [border-spacing:0.75rem]">
      <thead>
        <tr className="text-grayDark">
          <th scope="col" className="w-4/12 p-0">
            PAIR
          </th>
          <th scope="col" className="w-1/12 p-0">
            FEE
          </th>
          <th scope="col" className="w-2/12 p-0">
            MIN
          </th>
          <th scope="col" className="w-2/12 p-0">
            MAX
          </th>
          <th scope="col" className="w-2/12 p-0">
            AMOUNTS
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((lpPair) => (
          <LPPair key={lpPair?.tokenId?.toString()} {...lpPair} />
        ))}
      </tbody>
    </table>
  );
};

export default FundTableList;
