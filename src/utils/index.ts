import { ChainId } from "../config";
import { BigNumber } from "@ethersproject/bignumber";
import { getAddress } from "@ethersproject/address";

export const isMainNet = () => {
  const ActiveChainId = process.env.GATSBY_CHAIN_ID;
  const mainnet = ActiveChainId === ChainId.MAINNET.toString();
  return mainnet;
};

export function calculateGasMargin(value: BigNumber): BigNumber {
  return value
    .mul(BigNumber.from(10000).add(BigNumber.from(1000)))
    .div(BigNumber.from(10000));
}
export function isAddress(value: any): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

export const copyText = (text: string, cb?: () => void) => {
  if (navigator.clipboard && navigator.permissions) {
    navigator.clipboard.writeText(text).then(cb);
  } else if (document.queryCommandSupported("copy")) {
    const ele = document.createElement("textarea");
    ele.value = text;
    document.body.appendChild(ele);
    ele.select();
    document.execCommand("copy");
    document.body.removeChild(ele);
    cb?.();
  }
};
