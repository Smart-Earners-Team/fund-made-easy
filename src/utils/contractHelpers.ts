import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { simpleRpcProvider } from "./providers";
import BusdAbi from "../config/abi/busd.json"
import ZltSaleAbi from "../config/abi/zltSale.json"
import { getBusdAddress, getZltSaleAddress } from "./addressHelpers";

export const getContract = (abi: any, address: string, signer?: Signer | Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider;
  return new Contract(address, abi, signerOrProvider);
};

export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

export const getBusdContract = (signer?: Signer | Provider) => {
  return getContract(BusdAbi, getBusdAddress(), signer);
};

export const getZltContract = (signer?: Signer | Provider) => {
  return getContract(ZltSaleAbi, getZltSaleAddress(), signer);
};