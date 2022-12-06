import { useEffect, useState } from "react";
import { ConnectorNames } from "../components/WalletModal/types";
import { injected } from "../utils/web3React";
import useActiveWeb3React from "./useActiveWeb3React";
import useAuth from "./useAuth";

export function useEagerConnect() {
  const { active } = useActiveWeb3React();
  const { login } = useAuth();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        login(ConnectorNames.Injected);
        setTried(true);
      } else {
        setTried(true);
      }
    });
  }, [login]);

  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}
