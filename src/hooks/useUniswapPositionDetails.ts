import { useEffect, useState } from 'react';
import UniswapGraphService from '../services/uniswap-subgraph';

const useUniswapPositionDetails = (tokenId: string) => {
  const uniswapSubgraphService = new UniswapGraphService();
  const [positionDetails, setPositionDetails] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const results = await uniswapSubgraphService.getPositionDetails(tokenId);
      setPositionDetails(results.data.position);
    })();
  }, [tokenId]);

  return positionDetails;
};

export { useUniswapPositionDetails };
