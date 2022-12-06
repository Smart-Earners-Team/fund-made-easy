import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "gatsby";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { menuItem } from "../data/content";
import { StaticImage } from "gatsby-plugin-image";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const toggle = () => setNavOpen(!navOpen);
  return (
    <header className="shadow-md">
      <div className="bg-white flex items-center px-4 py-4 relative m-auto max-w-screen-xl w-full">
      <Link to="/">
        <StaticImage
          src="../images/fund-made-easy.jpg"
          alt="Fund made easy"
          quality={99}
          width={150}
        />
      </Link>
      <motion.nav
        animate={{ left: navOpen ? 0 : -1000, opacity: 1 }}
        initial={{ left: -1000, opacity: 0 }}
        transition={{ ease: "easeOut", duration: 0.4 }}
        className={` sm:block  lg:static sm:ml-auto absolute top-[80px] h-[100vh] sm:h-min w-screen sm:w-auto`}
      >
        <menu className="flex flex-col sm:flex-row basis-fulls ">
          {menuItem.map((item, index) => (
            <li className="text-center px-4 py-2 text-lg" key={index}>
              <Link to={item.url.toLowerCase()}>{item.linkText}</Link>
            </li>
          ))}
        </menu>
      </motion.nav>
      <div className="ml-auto lg:ml-10 flex gap-2">
        {navOpen ? (
          <AiOutlineClose
            onClick={toggle}
            className="md:hidden"
            size="30px"
          />
        ) : (
          <GiHamburgerMenu
            onClick={toggle}
            className="basis-full md:invisible"
            size="30px"
          />
        )}
        <div className="flex"></div>
      </div>
      </div>
    </header>
  );
};

export default Header;
