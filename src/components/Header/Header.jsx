import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import parseAddress from "../../utils/parseAddress";
import Button from "../Button";
import Logo from "../Logo";
import { ReactComponent as Hamburger } from "../../assets/Hamburger.svg";
import { ReactComponent as CloseNavIcon } from "../../assets/close.svg";
import { useConnectModal, useAccount } from "@web3modal/react";
import { useGoogleLogin } from "@react-oauth/google";

const navLinks = [
  { text: "About us", link: "/about" },
  { text: "Create Raffle", link: "/create" },
  { text: "Raffles", link: "/dashboard" },
  { text: "Profile", link: "/profile" },
  { text: "Promo Raffle", link: "/promo-raffle" },
];

const Header = ({ account }) => {
  const { isOpen, open, close } = useConnectModal();

  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  const connectWallet = () => {
    open();
  };

  const handleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => console.log("google signin success:: ", codeResponse),
    flow: "auth-code",
  });

  return (
    <div className="z-50 flex items-center justify-between w-full px-5 py-4 font-normal h-18 md:px-12">
      <Link to="/">
        <Logo />
      </Link>
      {isNavOpen ? (
        <CloseNavIcon
          className="cursor-pointer md:hidden w-7 h-7"
          onClick={() => setIsNavOpen(!isNavOpen)}
        />
      ) : (
        <Hamburger
          className="cursor-pointer md:hidden"
          onClick={() => setIsNavOpen(!isNavOpen)}
        />
      )}
      <div className="items-center hidden  md:flex desktop-nav">
        <nav className="flex items-center gap-8">
          {navLinks.map(({ link, text }) => (
            <Link key={text} to={link}>
              {text}
            </Link>
          ))}
          <Link key={"signIn"} onClick={() => handleLogin()}>
            Sign In
          </Link>
        </nav>
        {account ? (
          <Button
            text={`${parseAddress(account)} ${
              account === process.env.REACT_APP_ADMIN_WALLET_ADDRESS ? "| " : ""
            }`}
            accent
            additionalClass="px-10 ml-20"
          />
        ) : (
          <Button
            text="Connect"
            onClickHandler={connectWallet}
            additionalClass="ml-20"
            accent
          />
        )}
      </div>
      {isNavOpen && (
        <div
          className={
            "transition-opacity duration-100 mobile-nav  z-40 absolute h-screen text-lg bg-gradient-to-b from-black to-accent top-20 bottom-0 left-0 right-0 md:hidden flex flex-col px-12 items-center text-center justify-evenly"
          }
        >
          <nav className="flex flex-col gap-8 ">
            {navLinks.map(({ link, text }) => (
              <Link to={link}>{text}</Link>
            ))}
            <Link key={"signIn"} onClick={() => handleLogin()}>
              Sign In
            </Link>
          </nav>
          {account ? (
            <Button text={parseAddress(account)} accent />
          ) : (
            <Button text="Connect" onClickHandler={connectWallet} accent />
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
