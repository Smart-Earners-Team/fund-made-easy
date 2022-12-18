import React, { useCallback, useState } from "react";
import Button from "./Buttons/Button";
import { isAddress } from "../utils";
import { useAppContext } from "../hooks/useAppContext";
import useToast from "../hooks/useToast";
import useModal from "./Modal/useModal";

function InputReferralModal() {
  const [address, setAddress] = useState("");
  const [error, setError] = useState<null | string>(null);

  const { setRefAddress } = useAppContext();
  const { toastInfo } = useToast();
  const [, dismissModal] = useModal(<InputReferralModal />);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;
    const isValid = isAddress(input);
    if (isValid) {
      setError(null);
    } else {
      setError("Invalid address");
    }
    setAddress(input);
  };

  const saveReferralAddress = useCallback(() => {
    if (!error) {
      setRefAddress(address);
      toastInfo("Referral saved, you can now proceed to buy");
      dismissModal();
    }
  }, [address, setRefAddress, error]);

  return (
    <div className="bg-white p-5 mx-auto max-w-lg">
      <h3 className="uppercase text-base">Enter A valid referral address</h3>
      <input
        className="border w-full"
        onChange={handleOnChange}
        value={address}
      />
      {error && (
        <div className="text-sm bg-red-50 text-red-400 my-1">{error}</div>
      )}
      <Button
        onClick={saveReferralAddress}
        variant="outline"
        className="py-1 px-4 mt-6"
      >
        Procced to buy
      </Button>
    </div>
  );
}

export default InputReferralModal;
