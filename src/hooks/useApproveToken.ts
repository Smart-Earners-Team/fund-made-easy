import { useCallback } from "react";
import { ethers, Contract } from "ethers";
import { useCallWithGasPrice } from "./useCallWithGasPrice";
import { MaxUint256 } from "@ethersproject/constants";
import { calculateGasMargin } from "../utils";

const useApproveToken = (spenderContract: Contract, tokenAddress: string) => {
  const { callWithGasPrice } = useCallWithGasPrice();
  const handleApprove = useCallback(async () => {
    console.log(spenderContract)
    const estimatedGas = await spenderContract.estimateGas.approve(
      tokenAddress,
      MaxUint256
    );

    const tx = await callWithGasPrice(
      spenderContract,
      "approve",
      [tokenAddress, ethers.constants.MaxUint256],
      {
        gasLimit: calculateGasMargin(estimatedGas),
      }
    );
    const receipt = await tx.wait();
    return receipt.status;
  }, [tokenAddress, spenderContract, callWithGasPrice]);

  return { onApprove: handleApprove };
};

export default useApproveToken;
