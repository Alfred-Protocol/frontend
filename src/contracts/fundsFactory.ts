import { Signer, providers, ethers, BigNumber } from 'ethers';
import FundsFactory from '../abi/FundsFactory';

export const MUMBAI_FUNDS_FACTORY_ADDRESS =
  '0xB445Eff7a9d62be8c44671E0238982fc4605C896';

export const USDC_MUMBAI_ADDRESS = '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747';

const getContract = async (signerOrProvider: providers.Provider | Signer) => {
  if ((signerOrProvider as Signer)._isSigner) {
    const signer = signerOrProvider as Signer;

    return new ethers.Contract(
      MUMBAI_FUNDS_FACTORY_ADDRESS,
      FundsFactory,
      signer
    );
  } else {
    const provider = signerOrProvider as providers.Provider;
    return new ethers.Contract(
      MUMBAI_FUNDS_FACTORY_ADDRESS,
      FundsFactory,
      provider
    );
  }
};

type FundDetails = {
  startDate: BigNumber;
  endDate: BigNumber;
};

const createNewFund = async (
  signer: Signer,
  { startDate, endDate }: FundDetails
) => {
  const contract = await getContract(signer);
  const tx = await contract.createNewFund(
    USDC_MUMBAI_ADDRESS,
    startDate,
    endDate
  );

  return await tx.wait();
};

const getAllFunds = async (provider: providers.Provider) => {
  const contract = await getContract(provider);
  const [funds, fundsAddresses] = await contract.getAllFunds();
  return { funds, fundsAddresses };
};

const getFundDetails = async (
  provider: providers.Provider,
  managerAddress: string
) => {
  const contract = await getContract(provider);
  const fundDetails = await contract.getFundDetails(managerAddress);
  return fundDetails;
};

export { createNewFund, getAllFunds, getFundDetails };
