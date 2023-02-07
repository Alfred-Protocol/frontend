interface Props {
  managerAddress: string;
  netValue: number;
  netDeposit: number;
}

const AssetsHeader = ({ managerAddress, netDeposit, netValue }: Props) => {
  return (
    <div className="mb-14 w-3/5 rounded-xl border-2 border-[#EF5DA8] bg-blackfill py-8 px-8 text-left text-white">
      <div className="mb-2 text-3xl font-bold">👋 Welcome Back</div>
      <div className="mb-5">{managerAddress}</div>
      <div className="flex">
        <div className="flex-1">
          <p className="mb-2 text-2xl font-bold ">Net USD Value</p>
          <p className="mb-2 text-3xl ">{netValue.toLocaleString()}</p>
        </div>
        <div className="flex-1">
          <p className="mb-2 text-2xl font-bold">Net USD Deposit</p>
          <p className="mb-2 text-3xl">{netDeposit.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default AssetsHeader;
