import React, { useMemo } from "react";
import Button from "../Buttons/Button";
import useModal from "../Modal/useModal";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import GiftMembershipModal from "./GiftMembershipModal";

function GiftMemebership() {
  const { active } = useActiveWeb3React();

  const [openGiftMembershipModal] = useModal(
    <GiftMembershipModal />,
    false,
    false
  );
  const clickHandler = useMemo(() => openGiftMembershipModal, [active]);

  return (
    <Button className="w-full" onClick={clickHandler}>
      Gift Memebership
    </Button>
  );
}

export default GiftMemebership;
