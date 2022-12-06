import { Link } from "gatsby";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillMediumCircle } from "react-icons/ai";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-200 flex flex-col flex-wrap items-center p-5 mt-10">
      <div className="flex gap-10 p-16 my-10 border-solid w-full justify-center items-center">
        <AiFillTwitterCircle size="30px" />
        <AiFillLinkedin size="30px" />
        <AiFillMediumCircle size="30px" />
      </div>
      <div className="flex flex-wrap gap-7 sm:gap-2 justify-evenly text-center">
        <p className="sm:basis-3/12">
          For general inquiries, please{" "}
          <Link to="#">
            <strong>contactinfo@mail.example</strong>
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
