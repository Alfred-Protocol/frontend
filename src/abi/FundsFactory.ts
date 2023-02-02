export default [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_uniswapAdapterAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_uniswapNonFungiblePositionManagerAddress',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_stablecoinAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_startDate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_matureDate',
        type: 'uint256',
      },
    ],
    name: 'createNewFund',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'funds',
    outputs: [
      {
        internalType: 'contract Funds',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAllFunds',
    outputs: [
      {
        internalType: 'contract Funds[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_manager',
        type: 'address',
      },
    ],
    name: 'getFundsByManager',
    outputs: [
      {
        internalType: 'contract Funds',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'managerToFundsAddress',
    outputs: [
      {
        internalType: 'contract Funds',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;
