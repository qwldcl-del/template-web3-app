export const GDAv1ForwarderABI = [
  {
    type: 'function',
    name: 'createPool',
    inputs: [
      { name: 'token', type: 'address' },
      { name: 'admin', type: 'address' },
      {
        name: 'poolConfig',
        type: 'tuple',
        components: [
          { name: 'transferabilityForUnitsOwner', type: 'bool' },
          { name: 'distributionFromAnyAddress', type: 'bool' },
        ],
      },
    ],
    outputs: [{ name: '', type: 'bool' }, { name: 'poolAddress', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'connectPool',
    inputs: [{ name: 'poolAddress', type: 'address' }, { name: 'account', type: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'disconnectPool',
    inputs: [{ name: 'poolAddress', type: 'address' }, { name: 'account', type: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'claimAll',
    inputs: [
      { name: 'poolAddress', type: 'address' },
      { name: 'account', type: 'address' },
    ],
    outputs: [{ name: 'claimAmount', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'distribute',
    inputs: [
      { name: 'poolAddress', type: 'address' },
      { name: 'token', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'flowRate', type: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getPoolMembers',
    inputs: [{ name: 'poolAddress', type: 'address' }],
    outputs: [
      { name: 'members', type: 'address[]' },
      { name: 'units', type: 'uint256[]' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getPoolMemberUnits',
    inputs: [
      { name: 'poolAddress', type: 'address' },
      { name: 'member', type: 'address' },
    ],
    outputs: [{ name: 'units', type: 'uint256' }],
    stateMutability: 'view',
  },
] as const
