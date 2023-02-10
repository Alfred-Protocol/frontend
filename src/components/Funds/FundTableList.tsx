import { LPPositionsMock } from '@/mockData/mockData';
import type { LPPosition } from '@/types/type';
import { Table } from 'flowbite-react';
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
    <table className="w-full table-fixed border-separate border-spacing-0 overflow-x-auto text-xs">
      <thead>
        <tr className="text-grayDark">
          <th className="w-4/12">PAIR</th>
          <th className="w-1/12">FEE</th>
          <th className="w-2/12">MIN</th>
          <th className="w-2/12">MAX</th>
          <th className="w-3/12">AMOUNTS</th>
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
  );
};

export default FundTableList;
