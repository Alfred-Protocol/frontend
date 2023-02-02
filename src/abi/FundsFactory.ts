export default [
  'constructor(address,address)',
  'function createNewFund(address,uint256,uint256)',
  'function funds(uint256) view returns (address)',
  'function getAllFunds() view returns (address[])',
  'function getFundsByManager(address) view returns (address)',
  'function managerToFundsAddress(address) view returns (address)',
] as const;
