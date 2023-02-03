import React, { useCallback, useState } from "react";
import { isAddress } from "../../utils";
import { BiCheck } from "react-icons/bi";
import clx from "classnames";
import Button from "../Buttons/Button";
import highlighTextPrimary from "../HighlightText";
import { GiCancel } from "react-icons/gi";
import useModal from "../Modal/useModal";
import useToast from "../../hooks/useToast";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import { getFmeazyContract } from "../../utils/contractHelpers";

type Props = {};

function GiftMembershipModal({}: Props) {
  const [error, setError] = useState<null | string>(null);
  const [address, setAddress] = useState<string>("");
  const [confirmed, setConfirmed] = useState(false);
  const [requesting, setRequesting] = useState(false);

  const { library, account } = useActiveWeb3React();
  const [, closeModal] = useModal(null);
  const { toastError } = useToast();

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
          Hold 30 <b className="italic">BUSD</b> in your wallet to pay for
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
      <Button
        onClick={handlePayForMembership}
        disabled={requesting || !confirmed || !!error}
        className="w-full max-w-sm"
      >
        Pay
      </Button>
    </div>
  );
}

export default GiftMembershipModal;
