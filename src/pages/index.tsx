import HeroSection from '@/components/Homepage/HeroSection';
import Layout from '@/components/Layout/Layout';
import { USDC_MUMBAI_ADDRESS } from '@/contracts/fundsFactory';
import { BigNumber } from 'ethers';
import { useEffect } from 'react';
import { useContract, useProvider, useSigner } from 'wagmi';
import FundsFactory from '../abi/FundsFactory';

export default function HomePage() {
  const { data: signer } = useSigner();
  const contract = useContract({
    address: '0xB445Eff7a9d62be8c44671E0238982fc4605C896',
    abi: FundsFactory,
    signerOrProvider: signer,
  });
  useEffect(() => {
    if (contract) {
      console.log(contract);
      const now = new Date().getTime();
      // contract
      //   .createNewFund(
      //     USDC_MUMBAI_ADDRESS,
      //     BigNumber.from(now),
      //     BigNumber.from(now + 24 * 60 * 60 * 1000)
      //   )
      //   .then((res) => console.log(res));
      contract.getAllFunds().then((res) => console.log(res));
    }
  }, []);
  return (
    <Layout className="flex items-center">
      <HeroSection />
    </Layout>
  );
}
