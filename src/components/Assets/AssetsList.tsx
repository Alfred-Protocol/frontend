import PairValue from '../Common/PairValues';
import type { FundDetailsProps } from '../Funds/FundDetails';
import FundTableList from '../Funds/FundTableList';
// import ETH from 'src/components/Assets/ETH.png';
const AssetsList = ({
  fundAddress,
  isLoading,
  tokenA,
  tokenB,
  tvlSymbol,
  totalValueLocked = '32',
  matureDate = '05/03/2023',
  startDate = '01/02/2023',
  manager,
  description,
  yieldPercentage = 20.4,
}: FundDetailsProps) => {
  return (
    <div className="flex w-3/5 rounded-xl border-2 border-[#EF5DA8] bg-blackfill py-8 px-8 text-left text-white">
      <div className="mr-12 text-left">
        <p className="mb-2 text-2xl sm:text-3xl">Fund A</p>
        <PairValue field="TVL" value={totalValueLocked + ' ETH'} />
        <div className="flex items-center space-x-2">
          <p className="font-semibold sm:text-xl">Yield:</p>
          <p className="text-greenGrowth">{yieldPercentage}%</p>
        </div>
        <PairValue field="Start Date" value={startDate} />
        <PairValue
          field="Mature Date"
          value={matureDate}
          style={{ marginBottom: 5 }}
        />
      </div>
      <div className="flex flex-col">
        <div className="flex-1">testing</div>
        <div className="flex-1">
          <FundTableList />
        </div>
      </div>
    </div>
  );
};

export default AssetsList;
