import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import BigNumber from "bignumber.js";
import { MaxUint256 } from "@ethersproject/constants";
import useToast from "../../hooks/useToast";
import useModal from "../../components/Modal/useModal";
import Loading from "../../components/Loading";
import { useCallWithGasPrice } from "../../hooks/useCallWithGasPrice";
import {
  calculateGasMargin,
  formatBigNumberValues,
  isAddress,
} from "../../utils";
import MetamaskIcon from "../../components/Svg/Icons/Metamask";
import { registerToken } from "../../utils/wallet";
import { ethers } from "ethers";
import { useAppContext } from "../../hooks/useAppContext";
import CopyToClipboard from "../../components/Tools/copyToClipboard";
import type { PageProps } from "gatsby";
import InputReferralModal from "../../components/InputReferralModal";
import { RefreshContext } from "../../contexts/RefreshContext";
import CountdownTimer from "../../components/Tools/CountDownTimer";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import {
  getBep20Contract,
  getBusdContract,
  getFmeazyContract,
} from "../../utils/contractHelpers";
import { getBusdAddress, getFmeazyAddress } from "../../utils/addressHelpers";
import Button from "../../components/Buttons/Button";
import ConnectWalletButton from "../../components/Buttons/ConnectWalletButton";
import type { UserInfo } from "./types";
import Section from "../Section";
import { StaticImage } from "gatsby-plugin-image";
import MetricChip from "./MetricChip";
import GiftMembership from "../GiftMembershipComponents/GiftMembership";

const busdAddress = getBusdAddress();
const fmeazyAddress = getFmeazyAddress();
const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";

type UserInfoState = { [P in keyof UserInfo]: number } & { parent: string };
function UserInteractionComponent({ location }: PageProps) {
  const [endTime, setEndTime] = useState(Date.now() / 1000);
  // const [harvestDisabled, setHarvestDisabled] = useState(false);
  const [approved, setApproved] = useState(false);
  const [requesting, setRequesting] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfoState>({
    EazyMatrix: 0,
    EazyReferrals: 0,
    eazyRewardsPaid: 0,
    pendingReward: 0,
    refsCount: 0,
    refsWith3: 0,
    renewalVault: 0,
    busdBal: 0,
    parent: "",
  });
  const [activeUser, setActiveUser] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const { active, library, account } = useActiveWeb3React();
  const { fast } = useContext(RefreshContext);

  const { callWithGasPrice } = useCallWithGasPrice();
  const { toastError } = useToast();
  const [presentLoadingModal, dismissLoadingModal] = useModal(
    <Loading />,
    false
  );
  const [presentReferralInputModal] = useModal(<InputReferralModal />);
  const { refAddress, setRefAddress } = useAppContext();

  // We use this if user does not explicitly provide a ref address
  const isValidParent = useMemo(() => {
    const parent = userInfo.parent;
    if (!refAddress && parent && parent !== NULL_ADDRESS) {
      return parent;
    }
    return false;
  }, [refAddress, userInfo.parent]);

  // controll request modal
  useEffect(() => {
    if (requesting) {
      presentLoadingModal();
    } else {
      dismissLoadingModal();
    }
  }, [requesting]);

  // Check if he can buy
  useEffect(() => {
    if (account && library) {
      const contract = getFmeazyContract(library.getSigner(account));
      contract.isActiveUser(account).then((res: boolean) => {
        setActiveUser(res);
      });
    }
  }, [account, library, fast]);

  // Check user allowance
  useEffect(() => {
    (async () => {
      setRequesting(true);
      if (account && library) {
        const contract = getBep20Contract(
          busdAddress,
          library.getSigner(account)
        );
        contract
          .allowance(account, fmeazyAddress)
          .then(({ _hex }: any) => {
            if (MaxUint256.eq(_hex)) {
              setApproved(true);
            } else {
              setApproved(false);
            }
            return MaxUint256.eq(_hex); // return promise for finally to run
          })
          .finally(() => {
            setRequesting(false);
          });
      } else {
        setApproved(false);
        setRequesting(false);
      }
    })();
  }, [account, library, approved]);

  // fetch user info
  useEffect(() => {
    async function fetchUserInfo() {
      if (account && library) {
        const contract = getFmeazyContract(library.getSigner(account));
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
          parent,
        } = usersRes as UserInfo & { parent: string };
        const { endDate, pendingReward } = userInfoRes;
        const endDateformated = new BigNumber(endDate._hex).toNumber();
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
        ) as unknown as UserInfoState;
        setUserInfo({ ...userInfo, parent });
        setEndTime(endDateformated);
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
          parent: "",
        });
        setEndTime(Date.now() / 1000);
        setActiveUser(false);
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

  const handleApprove = useCallback(async () => {
    setRequesting(true);

    try {
      if (account && library) {
        const contract = getBusdContract(library?.getSigner(account));

        const estimatedGas = await contract.estimateGas.approve(
          fmeazyAddress,
          MaxUint256
        );

        const tx = await callWithGasPrice(
          contract,
          "approve",
          [fmeazyAddress, MaxUint256],
          {
            gasLimit: calculateGasMargin(estimatedGas),
          }
        );
        await tx.wait();
        setApproved(true);
      }
    } catch (e) {
      console.log(e);
      toastErrorHandler();
      setApproved(false);
    } finally {
      setRequesting(false);
    }
  }, [account, toastError, library]);

  const handleBuy = useCallback(async () => {
    if (account && library && refAddress) {
      setRequesting(true);
      const contract = getFmeazyContract(library.getSigner());
      contract
        .buy(refAddress)
        .then((tx: ethers.providers.TransactionResponse) => tx.wait())
        .then(() => setActiveUser(true)) // user is active
        .catch((error: any) => {
          const message = error.message;
          const matched = message.match(/\(reason="(.*)",\sm/);
          const searched = matched[1] as string; // second part
          if (searched) {
            toastError("Failed to buy", searched);
          } else {
            toastErrorHandler();
          }
        })
        .finally(() => {
          setRequesting(false);
        });
    } else {
      toastError("Can't buy without a referral", "Please use a valid referral");
      presentReferralInputModal();
    }
  }, [
    account,
    toastErrorHandler,
    library,
    refAddress,
    presentReferralInputModal,
  ]);

  const handleRewardClaim = useCallback(async () => {
    if (account && library) {
      try {
        setRequesting(true);
        const contract = getFmeazyContract(library.getSigner());
        const tx = await contract.claimReward();
        await tx.wait();
      } catch (error) {
        toastErrorHandler();
      } finally {
        setRequesting(false);
      }
    }
  }, [account, toastError, library]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;
    const isValid = isAddress(input);
    if (isValid) {
      setError(null);
    } else {
      setError("Invalid address");
    }
    setRefAddress(input);
  };

  return (
    <Section containerClass="mt-12" className="relative">
      <div className="w-full">
        <h3>Your Referral Link</h3>
        <CopyToClipboard
          content={`${location.origin}/?ref=${account}`}
          canCopy={Boolean(account)}
        />
      </div>
      <div className="flex flex-col space-y-10 md:space-y-0 md:flex-row justify-center items-start my-14 md:space-x-5 lg:space-x-10">
        <div className="w-full md:min-w-[450px] shadow-md px-2 py-8 border">
          <div className="rounded-lg py-2 px-4 bg-white border">
            <div className="font-light text-center">
              <div className="mb-2 font-light">Countdown to Renewal</div>
              <CountdownTimer
                timestamp={endTime}
                handleDisableButton={() => {}}
              />
            </div>
          </div>
          <div className="h-0.5 bg-gray-200 w-2/3 my-4 mx-auto" />
          {activeUser && (
            <div className="text-lg text-center">
              Renewal Vault: {userInfo.renewalVault} BUSD
            </div>
          )}
          {active && (
            <div className="my-3">
              <ConnectWalletButton />
            </div>
          )}
          {!activeUser && (
            <Fragment>
              <div className="flex flex-col sm:flex-row justify-center gap-4 px-4 items-center">
                <div className="w-full">
                  <div className="flex items-baseline gap-3">
                    <span className="text-5xl font-light">30</span>
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
                  <button
                    className="underline text-xs text-left text-[#AA8500] flex items-center justify-start gap-1"
                    onClick={() =>
                      registerToken(
                        busdAddress,
                        "BUSD",
                        18,
                        `https://assets-cdn.trustwallet.com/blockchains/smartchain/assets/${busdAddress}/logo.png`
                      )
                    }
                  >
                    Add BUSD to metamask{" "}
                    <MetamaskIcon style={{ cursor: "pointer" }} width="16px" />
                  </button>
                </div>
                {approved ? (
                  <div className="w-full flex flex-col gap-1">
                    <Button
                      className="text-sm md:text-base"
                      onClick={handleBuy}
                      disabled={userInfo.busdBal < 30 || requesting}
                    >
                      Buy
                    </Button>
                    {userInfo.busdBal < 30 && (
                      <small className="text-xs text-center text-red-500 font-light">
                        Insufficient BUSD balance
                      </small>
                    )}
                  </div>
                ) : active ? (
                  <Button
                    className="w-full text-sm md:text-base"
                    onClick={handleApprove}
                    disabled={requesting}
                  >
                    Approve
                  </Button>
                ) : (
                  <ConnectWalletButton />
                )}
              </div>
              <div className="bg-white py-5 px-4 mx-auto max-w-lg">
                <h3 className="text-sm">Enter a Valid Referral Address</h3>
                <input
                  className="border w-full p-1 bg-gray-50"
                  onChange={handleOnChange}
                  value={
                    refAddress ? refAddress : isValidParent ? isValidParent : ""
                  }
                />
                {error && (
                  <div className="text-sm bg-red-50 text-red-400 my-1">
                    {error}
                  </div>
                )}
              </div>
            </Fragment>
          )}
        </div>
        <div className="w-full max-w-md mb-3 mx-auto">
          {active ? (
            <div className="space-y-4">
              <div className="bg-white py-2 px-3 shadow-md rounded-lg text-base w-full border">
                <div className="flex gap-4 justify-between items-start">
                  <div className="space-y-1 w-full">
                    <div className="flex items-center text-xs space-x-1">
                      <StaticImage
                        alt=""
                        src="../../images/golden-reward-small-image.png"
                        width={20}
                        height={20}
                        placeholder="blurred"
                      />
                      <span>BUSD</span>
                    </div>
                    <div className="border-l-4 pl-3 w-full border-[#FC477E]">
                      <div className="font-medium">Eazy Rewards</div>
                      <div className="font-medium text-gray-600 text-sm py-1">
                        Pending: {userInfo.pendingReward}
                      </div>
                    </div>
                  </div>
                  {userInfo.pendingReward !== 0 && (
                    <div className="w-full">
                      <Button
                        className="w-full text-sm md:text-base"
                        disabled={requesting}
                        onClick={handleRewardClaim}
                      >
                        Claim
                      </Button>
                    </div>
                  )}
                </div>
                <div className="border-l-4 pl-3 w-full border-[#FC477E] border-t py-1">
                  <div className="text-gray-600 text-sm">
                    Paid: {userInfo.eazyRewardsPaid}
                  </div>
                </div>
              </div>

              {/* end */}
              <div className="flex justify-between gap-4">
                <MetricChip
                  label="Eazy Referrals"
                  value={userInfo.EazyReferrals}
                  symbol="BUSD"
                  borderColorClassName="border-[#D38B30]"
                  icon={
                    <StaticImage
                      alt=""
                      src="../../images/reward-badge-small-image.png"
                      width={20}
                      height={20}
                      placeholder="blurred"
                    />
                  }
                />
                <MetricChip
                  label="Referrals Count"
                  value={userInfo.refsCount}
                  symbol="Tally"
                  borderColorClassName="border-[#000000]"
                  icon={
                    <StaticImage
                      alt=""
                      src="../../images/tally-small-image.png"
                      width={20}
                      height={20}
                      placeholder="blurred"
                    />
                  }
                />
              </div>
              <div className="flex justify-between gap-4">
                <MetricChip
                  label="Eazy Matrix"
                  value={userInfo.EazyMatrix}
                  symbol="BUSD"
                  borderColorClassName="border-[#606AEA]"
                  icon={
                    <StaticImage
                      alt=""
                      src="../../images/matrix-small-image.png"
                      width={20}
                      height={20}
                      placeholder="blurred"
                    />
                  }
                />
                <MetricChip
                  label="Referrals With 3"
                  value={userInfo.refsWith3}
                  symbol="Tally"
                  borderColorClassName="border-[#B8D525]"
                  icon={
                    <StaticImage
                      alt=""
                      src="../../images/tally-small-image.png"
                      width={20}
                      height={20}
                      placeholder="blurred"
                    />
                  }
                />
              </div>
              <GiftMembership />
            </div>
          ) : (
            <div className="p-3 text-center flex flex-col items-center space-y-3 rounded-lg bg-white">
              <p>You will need to connect your wallet first</p>
              <ConnectWalletButton />
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

export default UserInteractionComponent;
