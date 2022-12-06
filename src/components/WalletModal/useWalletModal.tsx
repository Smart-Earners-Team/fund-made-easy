import React from "react";
import { Login } from "./types";
import ConnectModal from "./ConnectModal";
import useWalletContext from "../../hooks/useWalletContext";
import useModal from "../Modal/useModal";

interface ReturnType {
  onPresentConnectModal: () => void;
}

const useWalletModal = (login: Login, logout: () => void): ReturnType => {
  const { onDismiss } = useWalletContext();

  const [onPresentConnectModal] = useModal(<ConnectModal login={login} logout={logout} onDismiss={onDismiss} />);
  return { onPresentConnectModal };
};

export default useWalletModal;
