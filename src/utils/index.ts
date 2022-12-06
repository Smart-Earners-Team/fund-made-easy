import { ChainId } from "../config";
import { BigNumber } from "@ethersproject/bignumber";
import { getAddress } from "./addressHelpers";

export const isMainNet = () => {
  const ActiveChainId = process.env.GATSBY_CHAIN_ID;
  const mainnet = ActiveChainId === ChainId.MAINNET.toString();
  return mainnet;
};

export function calculateGasMargin(value: BigNumber): BigNumber {
  return value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000));
}
export function isAddress(value: any): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}
