import { ChainId } from "../config";
import { BigNumber } from "@ethersproject/bignumber";
import { getAddress } from "@ethersproject/address";
import BigNumberJs from "bignumber.js";
import { UserInfo } from "../components/UserInteractionComponent/types";
import { BIG_TEN } from "./bignumber";

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

export function formatBigNumberValues(
  userInfo: UserInfo,
  busdValues: string[]
) {
  let newObj = {} as { [P in keyof typeof userInfo]: number };
  for (const [key, value] of Object.entries(userInfo)) {
    if (busdValues.includes(key)) {
      // div busd values by 18, hack.
      newObj[key as keyof typeof userInfo] = new BigNumberJs(value?._hex || 0)
        .div(BIG_TEN.pow(18))
        .toNumber();
    } else {
      newObj[key as keyof typeof userInfo] = new BigNumberJs(
        value?._hex || 0
      ).toNumber();
    }
  }
  return newObj;
}
