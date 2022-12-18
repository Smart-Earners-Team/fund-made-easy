import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from "react";
import BigNumber from "bignumber.js";
import { isAddress } from "ethers/lib/utils";
import { addresses, networkList } from "../config";
import useQuery from "../hooks";
import useActiveWeb3React from "../hooks/useActiveWeb3React";
import { useEagerConnect } from "../hooks/useEagerConnect";
import { useInactiveListener } from "../hooks/useInactiveListener";
import useToast from "../hooks/useToast";
import { getContract } from "../utils/contractHelpers";
import {
  connectorsByName,
  resetWalletConnectConnector,
} from "../utils/web3React";
import { RefreshContext } from "./RefreshContext";
import erc20Abi from "../config/abi/erc20.json";
import { getAddress } from "../utils/addressHelpers";
import { ethers } from "ethers";
import { BIG_TEN } from "../utils/bignumber";

export interface GlobalAppContext {
  wallet: {
    active: boolean;
    balance: string;
    isConnecting: boolean;
    error: Error | undefined;
    retry: () => void;
  };
  setRefAddress: React.Dispatch<React.SetStateAction<string | null>>;
  triggerFetchTokens: () => void;
  refAddress: string | null;
}

const defaultValues: GlobalAppContext = {
  wallet: {
    active: false,
    balance: "0",
    isConnecting: true,
    error: undefined,
    retry: () => {},
  },
  setRefAddress: () => {},
  triggerFetchTokens: () => {},
  refAddress: null,
};

export const GlobalAppContextProvider =
  createContext<GlobalAppContext>(defaultValues);

export default function AppContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isConnecting, setIsConnecting] = useState(false);
  const { deactivate, active, error, account, library, setError } =
    useActiveWeb3React();
  const { fast } = useContext(RefreshContext);
  const { toastError } = useToast();
  // get wallet balance in bnb
  const [balance, setBalance] = useState("0");
  // Refferal
  const [refAddress, setRefAddress] = useState<string | null>(null);
  /* A workaround, I use this state to trigger an update in this context and
  Refetch the tokenBalances when it changes. */
  const [trigger, setTrigger] = useState(false);
  const refFromParams = useQuery().get("ref");

  useEffect(() => {
    const checkUserNetwork = async () => {
      const approvedChainId = process.env.GATSBY_CHAIN_ID;
      if (approvedChainId) {
        const usingChain = Number(approvedChainId) as keyof typeof networkList;
        library?.getNetwork().then((network) => {
          if (network.chainId !== usingChain) {
            console.error(
              `You have connected to the wrong network.
                Please switch to the ${networkList[usingChain].name} network`
            );
            setError(
              new Error(`You have connected to the wrong network.
              Please switch to the ${networkList[usingChain].name} network`)
            );
            toastError(
              `You have connected to the wrong network.
                Please switch to the ${networkList[usingChain].name} network`
            );
          }
        });
      }
    };
    checkUserNetwork();
  }, [library, setError]);

  useEffect(() => {
    if (active) {
      setIsConnecting(true);
    } else {
      setIsConnecting(false);
    }
  }, [active, error]);

  useEffect(() => {
    if (refFromParams !== null && isAddress(refFromParams)) {
      setRefAddress(refFromParams);
    } else {
      setRefAddress(null);
    }
  }, [account, refFromParams]);

  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager);

  const handleRetry = () => {
    setIsConnecting(false);
    resetWalletConnectConnector(connectorsByName["walletconnect"]);
    deactivate();
  };

  useEffect(() => {
    (async () => {
      if (account && library) {
        const contract = getContract(erc20Abi, getAddress(addresses.busd));
        contract
          .balanceOf(account)
          .then((p: ethers.BigNumber) => {
            const bal = new BigNumber(p._hex).div(BIG_TEN.pow(18)).toJSON();
            setBalance(bal);
          })
          .catch(() => {
            // console.error(e, "Error getting balance");
            setBalance("0");
          });
      } else {
        setBalance("0");
      }
    })();
    // also add the fast and slow vars from the refresh context
  }, [library, account, trigger, fast, active]);

  const triggerFetchTokens = useCallback(() => setTrigger((p) => !p), []);

  return (
    <GlobalAppContextProvider.Provider
      value={{
        wallet: {
          active,
          balance,
          isConnecting,
          error,
          retry: handleRetry,
        },
        setRefAddress,
        triggerFetchTokens,
        refAddress,
      }}
    >
      {children}
    </GlobalAppContextProvider.Provider>
  );
}
