import { ChainId } from './types'

// Superfluid Contract Addresses (Mainnet and Testnets)
export const SUPERFLUID_CONTRACTS: Record<number, {
  cfaV1Forwarder: string
  gdaV1Forwarder: string
  resolver: string
}> = {
  // Ethereum Mainnet
  [ChainId.MAINNET]: {
    cfaV1Forwarder: '0xcfA132E353cB4E398080B9700609bb008eceB125',
    gdaV1Forwarder: '0x6DA13Bde224A05a288748d857b9e7DDEffd1dE08',
    resolver: '0xE0cc76334405EEb902463C5d8d6DF76D5B4879c4',
  },
  // Polygon
  [ChainId.POLYGON]: {
    cfaV1Forwarder: '0xcfA132E353cB4E398080B9700609bb008eceB125',
    gdaV1Forwarder: '0x6DA13Bde224A05a288748d857b9e7DDEffd1dE08',
    resolver: '0xD20097611858e2D8b9B72089A7f47F3B5D9D4D5B',
  },
  // Arbitrum One
  [ChainId.ARBITRUM_ONE]: {
    cfaV1Forwarder: '0xcfA132E353cB4E398080B9700609bb008eceB125',
    gdaV1Forwarder: '0x6DA13Bde224A05a288748d857b9e7DDEffd1dE08',
    resolver: '0xD20097611858e2D8b9B72089A7f47F3B5D9D4D5B',
  },
  // Optimism
  [ChainId.OPTIMISM]: {
    cfaV1Forwarder: '0xcfA132E353cB4E398080B9700609bb008eceB125',
    gdaV1Forwarder: '0x6DA13Bde224A05a288748d857b9e7DDEffd1dE08',
    resolver: '0xD20097611858e2D8b9B72089A7f47F3B5D9D4D5B',
  },
  // Base
  [ChainId.BASE]: {
    cfaV1Forwarder: '0xcfA132E353cB4E398080B9700609bb008eceB125',
    gdaV1Forwarder: '0x6DA13Bde224A05a288748d857b9e7DDEffd1dE08',
    resolver: '0xD20097611858e2D8b9B72089A7f47F3B5D9D4D5B',
  },
  // Avalanche
  [ChainId.AVALANCHE]: {
    cfaV1Forwarder: '0xcfA132E353cB4E398080B9700609bb008eceB125',
    gdaV1Forwarder: '0x6DA13Bde224A05a288748d857b9e7DDEffd1dE08',
    resolver: '0xD20097611858e2D8b9B72089A7f47F3B5D9D4D5B',
  },
  // Goerli (Testnet)
  [ChainId.GOERLI]: {
    cfaV1Forwarder: '0xcfA132E353cB4E398080B9700609bb008eceB125',
    gdaV1Forwarder: '0x6DA13Bde224A05a288748d857b9e7DDEffd1dE08',
    resolver: '0xD20097611858e2D8b9B72089A7f47F3B5D9D4D5B',
  },
  // Sepolia (Testnet)
  [ChainId.SEPOLIA]: {
    cfaV1Forwarder: '0xcfA132E353cB4E398080B9700609bb008eceB125',
    gdaV1Forwarder: '0x6DA13Bde224A05a288748d857b9e7DDEffd1dE08',
    resolver: '0xD20097611858e2D8b9B72089A7f47F3B5D9D4D5B',
  },
  // Base Goerli (Testnet)
  [ChainId.BASE_GOERLI]: {
    cfaV1Forwarder: '0xcfA132E353cB4E398080B9700609bb008eceB125',
    gdaV1Forwarder: '0x6DA13Bde224A05a288748d857b9e7DDEffd1dE08',
    resolver: '0xD20097611858e2D8b9B72089A7f47F3B5D9D4D5B',
  },
}

// Popular Super Token addresses on different chains
export const SUPER_TOKENS: Record<number, {
  name: string
  symbol: string
  address: string
}[]> = {
  [ChainId.MAINNET]: [
    { name: 'Wrapped Ether', symbol: 'WETH', address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' },
    { name: 'Wrapped Native', symbol: 'WETH', address: '0x82aF49447D8a07e3bd95BD0d56f78341539c7892' }, // Arbitrum
  ],
  [ChainId.POLYGON]: [
    { name: 'Wrapped Ether', symbol: 'WETH', address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619' },
    { name: 'Wrapped Matic', symbol: 'WMATIC', address: '0x0d500B1d8E8aF31D4041f15E5a5ca2b7b0a5e0e2' },
  ],
  [ChainId.OPTIMISM]: [
    { name: 'Wrapped Ether', symbol: 'WETH', address: '0x4200000000000000000000000000000000000006' },
  ],
  [ChainId.BASE]: [
    { name: 'Wrapped Ether', symbol: 'WETH', address: '0x4200000000000000000000000000000000000006' },
  ],
}

// Default to Ethereum Mainnet
export const DEFAULT_CHAIN = ChainId.MAINNET
export const DEFAULT_CFA_FORWARDER = SUPERFLUID_CONTRACTS[DEFAULT_CHAIN].cfaV1Forwarder
export const DEFAULT_GDA_FORWARDER = SUPERFLUID_CONTRACTS[DEFAULT_CHAIN].gdaV1Forwarder
