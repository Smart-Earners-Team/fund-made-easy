import { ethers } from "ethers";

export type UserInfo = {
  EazyMatrix: ethers.BigNumber;
  EazyReferrals: ethers.BigNumber;
  refsWith3: ethers.BigNumber;
  refsCount: ethers.BigNumber;
  eazyRewardsPaid: ethers.BigNumber;
  busdBal: ethers.BigNumber;
  pendingReward: ethers.BigNumber;
  renewalVault: ethers.BigNumber;
};
