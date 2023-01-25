import React from "react";
import {
  RiInstagramLine,
  RiTelegramLine,
  RiTwitterLine,
  RiYoutubeLine,
} from "react-icons/ri";
import { GiHouse } from "react-icons/gi";
import Binance from "./Svg/Icons/Binance";

const Footer = () => {
  return (
    <footer className="bg-gray-200 flex flex-col flex-wrap items-center p-5 mt-10">
      <div className="flex flex-wrap gap-8 p-10 border-solid w-full justify-center items-center">
        <a
          href="https://www.instagram.com/fundingmadeeazy.com_official/"
          rel="noopener noreferrer"
          target={"_blank"}
        >
          <RiInstagramLine size="30px" />
        </a>
        <a
          href="https://www.youtube.com/@FundingMadeEazyOfficial"
          rel="noopener noreferrer"
          target={"_blank"}
        >
          <RiYoutubeLine size="30px" />
        </a>
        <a
          href="https://t.me/fundingmadeeazy"
          rel="noopener noreferrer"
          target={"_blank"}
        >
          <RiTelegramLine size="30px" />
        </a>
        <a
          href="https://twitter.com/FundingMadeEazy?t=CPmyUvQ5XsXiXFO1-G-Z-A&s=09"
          rel="noopener noreferrer"
          target={"_blank"}
        >
          <RiTwitterLine size="30px" />
        </a>
        <a
          href="https://www.clubhouse.com/join/funding-made-eazy/lBQXhcOU/xkjoaoao?utm_medium=ch_invite&utm_campaign=cJhylbi4uS2GBPEj8TqAsw-488490"
          rel="noopener noreferrer"
          target={"_blank"}
        >
          <GiHouse size="30px" />
        </a>
        <a
          href="https://bscscan.com/address/0xB93eDb2783632bCc59cc2ca563a2429bd373BD6B#writeContract"
          rel="noopener noreferrer"
          target={"_blank"}
        >
          <Binance width={30} height={30} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
