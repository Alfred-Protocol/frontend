interface Props {
  fundName: string;
  fundDescription: string;
  netValue: number;
  netDeposit: number;
}

const FundDetailHeader = ({
  fundName,
  fundDescription,
  netDeposit,
  netValue,
}: Props) => {
  return (
    <div className="w-full rounded-xl border-2 border-[#EF5DA8] bg-blackfill py-8 px-8 text-left text-fuchsia-100">
      <h1 className="mb-2 text-5xl font-bold">{fundName}</h1>
      <div className="mb-5 text-lg">{fundDescription}</div>
      <div className="flex">
        <div className="flex-1">
          <p className="mb-2 text-2xl font-bold">Net USD Value</p>
          <p className="mb-2 text-4xl font-thin">{netValue.toFixed(5)}</p>
        </div>
        <div className="flex-1">
          <p className="mb-2 text-2xl font-bold">Net USD Deposit</p>
          <p className="mb-2 text-4xl font-thin">{netDeposit.toFixed(5)}</p>
        </div>
      </div>
    </div>
  );
};

export default FundDetailHeader;
