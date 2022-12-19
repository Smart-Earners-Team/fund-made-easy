import { parseUnits } from "ethers/lib/utils";

export enum ChainId {
  MAINNET = 56,
  TESTNET = 97,
}

export const BASE_BSC_SCAN_URLS = {
  [ChainId.MAINNET]: "https://bscscan.com",
  [ChainId.TESTNET]: "https://testnet.bscscan.com",
};
export const BASE_BSC_SCAN_URL = BASE_BSC_SCAN_URLS[ChainId.MAINNET];

export const addresses = {
  fmeazy: {
    56: "0x4A6f3b2fd9E02BaED5515ebfAFAC8D2d501b909A",
    97: "0xc5DdfDE6dD3C0a45ad6eF157BB908849b268dDd9",
  },
  busd: {
    56: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    97: "0x3807C468D722aAf9e9A82d8b4b1674E66a12E607",
  },
};

export const networkList = {
  1: {
    url: "https://etherscan.io/",
    name: "Ethereum Mainnet",
  },
  2: {
    url: "https://mordenexplorer.ethernode.io/",
    name: "Morden",
  },
  3: {
    url: "https://ropsten.etherscan.io/",
    name: "Ropsten",
  },
  4: {
    url: "https://rinkeby.etherscan.io/",
    name: "Rinkeby",
  },
  42: {
    url: "https://kovan.etherscan.io/",
    name: "Kovan",
  },
  56: {
    url: "https://bsc-dataseed.binance.org/",
    name: "Binance Smart Chain",
  },
  97: {
    url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    name: "Binance Smart Chain - Testnet",
  },
  43114: {
    url: "https://api.avax.network/ext/bc/C/rpc",
    name: "Avalanche",
  },
};

export enum GAS_PRICE {
  default = "5",
  fast = "6",
  instant = "7",
  testnet = "10",
}

export const GAS_PRICE_GWEI = {
  default: parseUnits(GAS_PRICE.default, "gwei").toString(),
  fast: parseUnits(GAS_PRICE.fast, "gwei").toString(),
  instant: parseUnits(GAS_PRICE.instant, "gwei").toString(),
  testnet: parseUnits(GAS_PRICE.testnet, "gwei").toString(),
};
