import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

const useAlchemy = () => {
  const [alchemy, setAlchemy] = useState<Alchemy | undefined>(undefined);
  const { status } = useAccount();

  useEffect(() => {
    if (status === 'connected' && alchemy === undefined) {
      setAlchemy(
        new Alchemy({
          apiKey: process.env.ALCHEMY_API_MUMBAI_API_KEY,
          network: Network.MATIC_MUMBAI,
        })
      );
    }
  }, [status]);

  return { alchemy };
};

export default useAlchemy;
