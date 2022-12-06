import { useEffect } from "react";
import { ConnectorNames } from "../components/WalletModal/types";
import useActiveWeb3React from "./useActiveWeb3React";
import useAuth from "./useAuth";

export function useInactiveListener(suppress = false) {
  const { active, error } = useActiveWeb3React();
  const { login } = useAuth();

  useEffect(() => {
    const { ethereum } = window;
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleChainChanged = (chainId: string | number) => {
        if (process.env.NODE_ENV === "development") {
          console.log("chainChanged", chainId);
        }
        login(ConnectorNames.Injected);
      };

      const handleAccountsChanged = (accounts: string[]) => {
        if (process.env.NODE_ENV === "development") {
          console.log("accountsChanged", accounts);
        }
        if (accounts.length > 0) {
          login(ConnectorNames.Injected);
        }
      };

      const handleNetworkChanged = (networkId: string | number) => {
        if (process.env.NODE_ENV === "development") {
          console.log("networkChanged", networkId);
        }
        login(ConnectorNames.Injected);
      };

      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);
      ethereum.on("networkChanged", handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("chainChanged", handleChainChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
          ethereum.removeListener("networkChanged", handleNetworkChanged);
        }
      };
    }

    return () => {};
  }, [active, error, suppress, login]);
}
