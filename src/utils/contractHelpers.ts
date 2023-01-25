import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { simpleRpcProvider } from "./providers";
import BusdAbi from "../config/abi/busd.json";
import fmeazyAbi from "../config/abi/fmeazy.json";
import oldFmeazyAbi from "../config/abi/old-fmeazy.json";
import {
  getBusdAddress,
  getFmeazyAddress,
  getOldFmeazyAddress,
} from "./addressHelpers";
import bep20Abi from "../config/abi/erc20.json";

export const getContract = (
  abi: any,
  address: string,
  signer?: Signer | Provider
) => {
  const signerOrProvider = signer ?? simpleRpcProvider;
  return new Contract(address, abi, signerOrProvider);
};

export function getSigner(
  library: Web3Provider,
  account: string
): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

export function getProviderOrSigner(
  library: Web3Provider,
  account?: string
): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

export const getBusdContract = (signer?: Signer | Provider) => {
  return getContract(BusdAbi, getBusdAddress(), signer);
};

export const getFmeazyContract = (signer?: Signer | Provider) => {
  return getContract(fmeazyAbi, getFmeazyAddress(), signer);
};

export const getOldFmeazyContract = (signer?: Signer | Provider) => {
  return getContract(oldFmeazyAbi, getOldFmeazyAddress(), signer);
};

export const getBep20Contract = (
  address: string,
  signer?: Signer | Provider
) => {
  return getContract(bep20Abi, address, signer);
};
