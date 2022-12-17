import { HeadFC } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React, { useCallback, useEffect, useState } from "react";
import Button from "../components/Buttons/Button";
import ConnectWalletButton from "../components/Buttons/ConnectWalletButton";
import highlighText from "../components/HighlightText";
import Layout from "../components/Layout";
import Section from "../components/Section";
import SEO from "../components/SEO";
import CountdownTimer from "../components/Tools/CountDownTimer";
import useActiveWeb3React from "../hooks/useActiveWeb3React";
import classNames from "classnames";
import Link from "../components/Link";
import {
  getBep20Contract,
  getBusdContract,
  getFmeazyContract,
} from "../utils/contractHelpers";
import { getBusdAddress, getFmeazyAddress } from "../utils/addressHelpers";
import BigNumber from "bignumber.js";
import { MaxUint256 } from "@ethersproject/constants";
import useApproveToken from "../hooks/useApproveToken";
import useToast from "../hooks/useToast";
import useModal from "../components/Modal/useModal";
import Loading from "../components/Loading";
import { useCallWithGasPrice } from "../hooks/useCallWithGasPrice";
import { calculateGasMargin } from "../utils";

const busdAddress = getBusdAddress();
const fmeazyAddress = getFmeazyAddress();

const IndexPage = () => {
  const [contractBal, setContractBal] = useState("0");
  const [daysOfReplant, setDaysOfReplant] = useState("0");
  const [treeBal, setTreeBal] = useState("0");
  const [avaxRewards, setAvaxRewards] = useState("0");
  const [endTime, setEndTime] = useState(Date.now() / 1000);
  const [harvestDisabled, setHarvestDisabled] = useState(false);
  const [rePlanting, setRePlanting] = useState(false);
  const [harvesting, setHarvesting] = useState(false);
  const [planting, setPlanting] = useState(false);
  const [amountToPay, setAmountToPay] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [approved, setApproved] = useState(false);
  const [requesting, setRequesting] = useState(true);

  const { active, library, account } = useActiveWeb3React();

  const { callWithGasPrice } = useCallWithGasPrice();
  const { toastError } = useToast();
  const [presentLoadingModal, dismissLoadingModal] = useModal(
    <Loading />,
    false
  );

  useEffect(() => {
    if (requesting) {
      presentLoadingModal();
    } else {
      dismissLoadingModal();
    }
  }, [requesting]);

  // Check user allowance
  useEffect(() => {
    (async () => {
      setRequesting(true);
      if (account && active && library) {
        const contract = getBep20Contract(
          busdAddress,
          library?.getSigner(account)
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
  }, [account, active, library, approved]);

  const disableHarvestButton = useCallback((state: boolean) => {
    setHarvestDisabled(state);
  }, []);

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
    if (account && library) {
      try {
        setRequesting(true);
        const contract = getFmeazyContract(library.getSigner());
        await contract.buy(account);
      } catch (error) {
        toastErrorHandler();
      } finally {
        setRequesting(false);
      }
    }
  }, [account, toastError, library]);

  const handleHarvest = useCallback(async () => {}, []);

  return (
    <Layout>
      <Section padding className="space-y-6">
        <h1>FundingMadeEazy</h1>
        <p>
          {highlighText("FundingMadeEazy", "text-[#E6B32A] font-bold italic")}{" "}
          is a decentralized smart contract on the Binance Smart Chain (BSC).
        </p>
        <p>
          {highlighText("FundingMadeEazy", "text-[#E6B32A] font-bold italic")}{" "}
          uses a Multiple of 3 through 7 Repetitions called the{" "}
          {highlighText("Eazy Matrix", "text-[#E6B32A] font-bold italic")}{" "}
          (every member will have their own{" "}
          {highlighText("Eazy Matrix", "text-[#E6B32A] font-bold italic")}{" "}
          within the main{" "}
          {highlighText("Eazy Matrix", "text-[#E6B32A] font-bold italic")}).
        </p>
        <p>
          This {highlighText("Eazy Matrix", "text-[#E6B32A] font-bold italic")}{" "}
          assists anyone in raising and receiving Funds (BUSD) in 3 Ways:
        </p>
        <ol className="list-decimal list-inside">
          <li>
            {highlighText(
              "Eazy Referrals",
              "text-[#E6B32A] font-bold no-underline italic"
            )}{" "}
            (transferred instantly to your BUSD wallet)
          </li>
          <li>
            {highlighText(
              "Eazy Matrix",
              "text-[#E6B32A] font-bold no-underline italic"
            )}{" "}
            (transferred instantly to your BUSD wallet)
          </li>
          <li>
            {highlighText(
              "Eazy Rewards",
              "text-[#E6B32A] font-bold no-underline italic"
            )}{" "}
            (available on a Daily Recurring Basis for you to Claim)
          </li>
        </ol>
      </Section>
      <Section padding className="relative">
        <div className="flex flex-col space-y-10 md:space-y-0 md:flex-row justify-center items-start my-10 md:space-x-10">
          <div className="w-full shadow-md px-2 py-8 border">
            <div className="rounded-lg py-2 px-4 bg-white border">
              <div className="font-light text-center">
                <div className="mb-2 font-light">Countdown to Renewal</div>
                <CountdownTimer
                  timestamp={endTime}
                  handleDisableButton={disableHarvestButton}
                />
              </div>
            </div>
            <div className="h-0.5 bg-gray-200 w-2/3 my-4 mx-auto" />
            <div className="flex justify-center items-center">
              <div className="w-full">
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-light">30</span>
                  <div className="flex items-baseline gap-2">
                    <StaticImage
                      width={35}
                      height={35}
                      placeholder="blurred"
                      alt=""
                      src="../images/busd-logo.png"
                      class="flex-none"
                    />
                    <span className="text-2xl font-light">BUSD</span>
                  </div>
                </div>
                <Link to="#" className="underline text-xs text-[#AA8500]">
                  Add BUSD to metamask
                </Link>
              </div>
              {approved ? (
                <Button
                  className="sm:w-full text-sm md:text-base"
                  onClick={handleBuy}
                >
                  Buy
                </Button>
              ) : (
                <Button
                  className="sm:w-full text-sm md:text-base"
                  onClick={handleApprove}
                >
                  Approve BUSD
                </Button>
              )}
            </div>
          </div>
          <div className="w-full max-w-md mb-3 mx-auto">
            {active ? (
              <div className="space-y-4">
                <MetricChip
                  label="Eazy Rewards"
                  value={treeBal}
                  symbol="BUSD"
                  borderColorClassName="border-[#FC477E]"
                  icon={
                    <StaticImage
                      alt=""
                      src="../images/golden-reward-small-image.png"
                      width={20}
                      height={20}
                      placeholder="blurred"
                    />
                  }
                  actionContainer={
                    <Button className="w-full text-sm md:text-base">
                      Claim Rewards
                    </Button>
                  }
                />
                <div className="flex justify-between gap-4">
                  <MetricChip
                    label="Eazy Referrals"
                    value={treeBal}
                    symbol="BUSD"
                    borderColorClassName="border-[#D38B30]"
                    icon={
                      <StaticImage
                        alt=""
                        src="../images/reward-badge-small-image.png"
                        width={20}
                        height={20}
                        placeholder="blurred"
                      />
                    }
                  />
                  <MetricChip
                    label="Referrals Count"
                    value={treeBal}
                    symbol="Tally"
                    borderColorClassName="border-[#000000]"
                    icon={
                      <StaticImage
                        alt=""
                        src="../images/tally-small-image.png"
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
                    value={treeBal}
                    symbol="BUSD"
                    borderColorClassName="border-[#606AEA]"
                    icon={
                      <StaticImage
                        alt=""
                        src="../images/matrix-small-image.png"
                        width={20}
                        height={20}
                        placeholder="blurred"
                      />
                    }
                  />
                  <MetricChip
                    label="Referrals With 3"
                    value={treeBal}
                    symbol="Tally"
                    borderColorClassName="border-[#B8D525]"
                    icon={
                      <StaticImage
                        alt=""
                        src="../images/tally-small-image.png"
                        width={20}
                        height={20}
                        placeholder="blurred"
                      />
                    }
                  />
                </div>
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
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <SEO
    title="Home"
    description="FundingMadeEazy is a decentralized smart contract on the Binance Smart Chain (BSC). It used a Multiple of 3 through 7 Repetitions called the Eazy Matrix (every member will have their own Eazy Matrix within the main Eazy Matrix)."
  />
);

interface MetricChipProps {
  label: string;
  value: string;
  symbol: string;
  borderColorClassName?: string;
  icon: React.ReactNode;
  actionContainer?: JSX.Element;
}

const MetricChip = ({
  label,
  value,
  symbol,
  borderColorClassName,
  icon,
  actionContainer,
}: MetricChipProps) => {
  return (
    <div className="bg-white py-2 px-3 shadow-md rounded-lg text-base w-full flex gap-4 justify-between items-center border">
      <div className="space-y-1 w-full">
        <div className="flex items-center text-xs space-x-1">
          {icon}
          <span>{symbol}</span>
        </div>
        <div
          className={classNames(
            "border-l-4 pl-3 w-full",
            borderColorClassName,
            {
              "border-red-500": !borderColorClassName,
            }
          )}
        >
          <div className="font-medium">{label}</div>
          <div className="font-medium text-gray-500">{value}</div>
        </div>
      </div>
      {actionContainer && <div className="w-full">{actionContainer}</div>}
    </div>
  );
};
