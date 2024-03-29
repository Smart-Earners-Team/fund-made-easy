import { addresses, ChainId } from "../config";
import { Address } from "../config/types";

export const getAddress = (address: Address): string => {
  const chainId = process.env.GATSBY_CHAIN_ID as unknown as keyof Address;
  return (address[chainId] ? address[chainId] : address[ChainId.MAINNET])!;
};

export const getBusdAddress = () => getAddress(addresses.busd);
export const getFmeazyAddress = () => getAddress(addresses.fmeazy);
export const getOldFmeazyAddress = () => getAddress(addresses.oldFmeazy);
