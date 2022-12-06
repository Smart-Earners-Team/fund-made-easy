import React from "react";
import { RiTelegramLine, RiTwitterLine, RiYoutubeLine } from "react-icons/ri";
import { GiHouse } from "react-icons/gi";

const Footer = () => {
  return (
    <footer className="bg-gray-200 flex flex-col flex-wrap items-center p-5 mt-10">
      <div className="flex gap-10 p-10 border-solid w-full justify-center items-center">
        <a href="https://twitter.com/abdul_shabz?t=aBWHixvZbOi93B2n0WEdtg&s=09" rel="noopener noreferrer">
          <RiTwitterLine size="30px" />
        </a>
        <a href="https://t.me/fundingmadeeazy" rel="noopener noreferrer">
          <RiTelegramLine size="30px" />
        </a>
        <a href="https://youtube.com/@fundingmadeeasy2022" rel="noopener noreferrer">
          <RiYoutubeLine size="30px" />
        </a>
        <a href="https://www.clubhouse.com/join/funding-made-eazy/lBQXhcOU/xkjoaoao?utm_medium=ch_invite&utm_campaign=cJhylbi4uS2GBPEj8TqAsw-488490" rel="noopener noreferrer">
          <GiHouse size="30px" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
