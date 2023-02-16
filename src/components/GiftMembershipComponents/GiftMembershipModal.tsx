import React, { useCallback, useEffect, useState } from "react";
import { calculateGasMargin, isAddress } from "../../utils";
import { BiCheck } from "react-icons/bi";
import clx from "classnames";
import Button from "../Buttons/Button";
import highlighTextPrimary from "../HighlightText";
import { GiCancel } from "react-icons/gi";
import useModal from "../Modal/useModal";
import useToast from "../../hooks/useToast";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import {
  getBep20Contract,
  getBusdContract,
  getFmeazyContract,
} from "../../utils/contractHelpers";
import { getBusdAddress, getFmeazyAddress } from "../../utils/addressHelpers";
import { MaxUint256 } from "@ethersproject/constants";
import { useCallWithGasPrice } from "../../hooks/useCallWithGasPrice";

type Props = {};

const busdAddress = getBusdAddress();
const fmeazyAddress = getFmeazyAddress();

function GiftMembershipModal({}: Props) {
  const [address, setAddress] = useState<string>("");
  const [approved, setApproved] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [requesting, setRequesting] = useState(false);

  const { library, account } = useActiveWeb3React();
  const { callWithGasPrice } = useCallWithGasPrice();
  const [, closeModal] = useModal(null);
  const { toastError } = useToast();

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

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.currentTarget.value;
      const isValid = isAddress(input);
      if (isValid) {
        setError(null);
      } else {
        setError("Invalid address");
        setConfirmed(false);
      }
      setAddress(input);
    },
    []
  );

  const toastErrorHandler = useCallback(
    () =>
      toastError(
        "Error",
        "Please try again. Confirm the transaction and make sure you are paying enough gas!"
      ),
    []
  );

  const handlePayForMembership = useCallback(async () => {
    if (account && library) {
      try {
        setRequesting(true);
        const contract = getFmeazyContract(library.getSigner());
        const tx = await contract.giftMembership(address);
        await tx.wait();
      } catch (error) {
        console.log(error);
        toastErrorHandler();
      } finally {
        setRequesting(false);
      }
    }
  }, [account, toastError, library, address]);

  return (
    <div className="w-full max-w-screen-lg shadow-lg border p-3 md:p-10 bg-white mx-auto text-2xl space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-4xl">Gift a Membership to Your Loved Ones</h3>
        <button
          aria-label="close modal"
          className="bg-gray-200 hover:bg-gray-200 transition-colors flex-none text-gray-600"
          onClick={closeModal}
        >
          <GiCancel size={50} />
        </button>
      </div>
      <p>
        Now you can help others receive from{" "}
        {highlighTextPrimary("FundingMadeEazy")} by paying for their membership.
      </p>
      <ol className="list-decimal list-inside space-y-2 text-xl">
        <li>
          Hold 30 <b className="italic">BUSD</b> in your wallet to pay for a
          membership 💰
        </li>
        <li>Enter the address you want to pay for 📝</li>
        <li>Confirm the transaction 👍</li>
        <li>Share the love ❤️💕</li>
      </ol>
      <div className="w-full">
        <label htmlFor="address" className="text-sm font-light">
          Wallet Address (
          <span className="text-gray-500">Enter and confirm</span>)
        </label>
        <div className="flex">
          <input
            className="border w-full p-1 bg-gray-50"
            onChange={handleOnChange}
            value={address}
            id="address"
          />
          <button
            className={clx(
              "bg-green-100 text-green-600 flex-shrink-0 flex-grow-0 border-4 ml-2",
              confirmed ? "border-green-600" : "border-gray-300"
            )}
            onClick={() => {
              if (isAddress(address)) setConfirmed(true);
            }}
          >
            <BiCheck size={40} />
          </button>
        </div>
        {error && <div className="text-xs text-red-400 my-1">{error}</div>}
      </div>
      {approved ? (
        <Button
          onClick={handlePayForMembership}
          disabled={requesting || !confirmed || !!error}
          className="w-full max-w-sm"
        >
          Pay
        </Button>
      ) : (
        <Button
          className="w-full text-sm md:text-base"
          onClick={handleApprove}
          disabled={requesting}
        >
          Approve
        </Button>
      )}
    </div>
  );
}

export default GiftMembershipModal;
