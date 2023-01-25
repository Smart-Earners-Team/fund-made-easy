import React, { useCallback, useContext, useEffect, useState } from "react";
import { StaticImage } from "gatsby-plugin-image";
import Button from "../Buttons/Button";
import Section from "../Section";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import {
  getBep20Contract,
  getOldFmeazyContract,
} from "../../utils/contractHelpers";
import useToast from "../../hooks/useToast";
import { formatBigNumberValues } from "../../utils";
import { getBusdAddress } from "../../utils/addressHelpers";
import { UserInfo } from "../UserInteractionComponent/types";
import { RefreshContext } from "../../contexts/RefreshContext";

type Props = {
  requesting: boolean;
  handleRequest: React.Dispatch<React.SetStateAction<boolean>>;
};

const busdAddress = getBusdAddress();

function OldUserClaimRewards({ requesting, handleRequest }: Props) {
  const [userInfo, setUserInfo] = useState<
    ReturnType<typeof formatBigNumberValues>
  >({
    EazyMatrix: 0,
    EazyReferrals: 0,
    eazyRewardsPaid: 0,
    pendingReward: 0,
    refsCount: 0,
    refsWith3: 0,
    renewalVault: 0,
    busdBal: 0,
  });

  const { account, library } = useActiveWeb3React();
  const { toastError } = useToast();
  const { fast } = useContext(RefreshContext);

  // fetch user info
  useEffect(() => {
    async function fetchUserInfo() {
      if (account && library) {
        const contract = getOldFmeazyContract(library.getSigner(account));
        const busdContract = getBep20Contract(busdAddress, library.getSigner());

        const usersRes = await contract.users(account);
        const userInfoRes = await contract.userInfo(account);
        const busdBal = await busdContract.balanceOf(account);
        const {
          EazyMatrix,
          EazyReferrals,
          refsWith3,
          refsCount,
          eazyRewardsPaid,
          renewalVault,
        } = usersRes as UserInfo;
        const { pendingReward } = userInfoRes;
        const userInfo = formatBigNumberValues(
          {
            EazyMatrix,
            EazyReferrals,
            refsWith3,
            refsCount,
            eazyRewardsPaid,
            pendingReward,
            renewalVault,
            busdBal,
          },
          [
            "EazyMatrix",
            "EazyReferrals",
            "pendingReward",
            "renewalVault",
            "eazyRewardsPaid",
            "busdBal",
          ]
        );
        setUserInfo(userInfo);
      } else {
        setUserInfo({
          EazyMatrix: 0,
          EazyReferrals: 0,
          eazyRewardsPaid: 0,
          pendingReward: 0,
          refsCount: 0,
          refsWith3: 0,
          renewalVault: 0,
          busdBal: 0,
        });
      }
    }
    fetchUserInfo();
  }, [account, library, fast]);

  const toastErrorHandler = useCallback(
    () =>
      toastError(
        "Error",
        "Please try again. Confirm the transaction and make sure you are paying enough gas!"
      ),
    []
  );

  const handleRewardClaim = useCallback(async () => {
    if (account && library) {
      try {
        handleRequest(true);
        const contract = getOldFmeazyContract(library.getSigner());
        const tx = await contract.claimReward();
        await tx.wait();
      } catch (error) {
        toastErrorHandler();
      } finally {
        handleRequest(false);
      }
    }
  }, [account, toastError, library]);

  return userInfo.pendingReward !== 0 ? (
    <Section containerClass="mb-10 -mt-10">
      <h3>Claim Old Contract Rewards</h3>
      <p className="text-sm text-gray-500">
        We have recently updated our contract and it appears that you have some
        outstanding rewards to redeem from the previous contract.
      </p>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-5 mt-6">
        <div className="flex items-baseline gap-3">
          <span className="text-5xl font-light">{userInfo.pendingReward}</span>
          <div className="flex items-baseline gap-2">
            <StaticImage
              width={35}
              height={35}
              placeholder="blurred"
              alt=""
              src="../../images/busd-logo.png"
              class="flex-none"
            />
            <span className="text-2xl font-light">BUSD</span>
          </div>
        </div>
        <Button
          className="w-full max-w-xs text-sm md:text-base"
          disabled={requesting}
          onClick={handleRewardClaim}
        >
          Claim
        </Button>
      </div>
    </Section>
  ) : (
    <div />
  );
}

export default OldUserClaimRewards;
