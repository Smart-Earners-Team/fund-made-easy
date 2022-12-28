import React from "react";
import { RiInstagramLine, RiTelegramLine, RiTwitterLine, RiYoutubeLine } from "react-icons/ri";
import { GiHouse } from "react-icons/gi";
import Binance from "./Svg/Icons/Binance";

const Footer = () => {
  return (
    <footer className="bg-gray-200 flex flex-col flex-wrap items-center p-5 mt-10">
      <div className="flex flex-wrap gap-8 p-10 border-solid w-full justify-center items-center">
        <a href="https://twitter.com/abdul_shabz?t=aBWHixvZbOi93B2n0WEdtg&s=09" rel="noopener noreferrer">
          <RiTwitterLine size="30px" />
        </a>
        <a href="https://t.me/fundingmadeeazy" rel="noopener noreferrer">
          <RiTelegramLine size="30px" />
        </a>
        <a href="https://www.instagram.com/p/Cmp8U7XIbvl/?igshid=YmMyMTA2M2Y=" rel="noopener noreferrer">
          <RiInstagramLine size="30px" />
        </a>
        <a href="https://youtube.com/@fundingmadeEazy2022" rel="noopener noreferrer">
          <RiYoutubeLine size="30px" />
        </a>
        <a href="https://www.clubhouse.com/join/funding-made-eazy/lBQXhcOU/xkjoaoao?utm_medium=ch_invite&utm_campaign=cJhylbi4uS2GBPEj8TqAsw-488490" rel="noopener noreferrer">
          <GiHouse size="30px" />
        </a>
        <a href="https://bscscan.com/address/0x4A6f3b2fd9E02BaED5515ebfAFAC8D2d501b909A#writeContract" rel="noopener noreferrer">
          <Binance width={30} height={30} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
