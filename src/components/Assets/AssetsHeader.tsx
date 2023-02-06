const AssetsHeader = () => {
  return (
    <div className="w-3/5 rounded-xl border-[#EF5DA8] bg-blackfill py-8 px-8 text-left text-white">
      <div className="mb-2 text-3xl font-bold">👋 Welcome Back</div>
      <div className="mb-5">0x7730B4Cdc1B1E7a33A309AB7205411faD009C106</div>
      <div className="flex">
        <div className="flex-1">
          <p className="mb-2 text-2xl font-bold ">Net USD Value</p>
          <p className="mb-2 text-3xl ">3,101.20</p>
        </div>
        <div className="flex-1">
          <p className="mb-2 text-2xl font-bold">Net USD Deposit</p>
          <p className="mb-2 text-3xl">3,101.20</p>
        </div>
      </div>
    </div>
  );
};

export default AssetsHeader;
