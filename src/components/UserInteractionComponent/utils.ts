import BigNumber from "bignumber.js";
import { BIG_TEN } from "../../utils/bignumber";
import type { UserInfo } from "./types";

export function formatBigNumberValues(
    userInfo: UserInfo,
    busdValues: string[]
  ) {
    let newObj = {} as { [P in keyof typeof userInfo]: number };
    for (const [key, value] of Object.entries(userInfo)) {
      if (busdValues.includes(key)) {
        // div busd values by 18, hack.
        newObj[key as keyof typeof userInfo] = new BigNumber(value?._hex || 0)
          .div(BIG_TEN.pow(18))
          .toNumber();
      } else {
        newObj[key as keyof typeof userInfo] = new BigNumber(
          value?._hex || 0
        ).toNumber();
      }
    }
    return newObj;
  }