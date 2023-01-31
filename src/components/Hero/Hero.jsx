import React from "react";
import Button from "../Button";
import { ReactComponent as Background } from "../../assets/bg-2.svg";
import { useNavigate } from "react-router-dom";
import "./Hero.css";
import RaffleCard from "../RaffleCard/RaffleCard";
// import { Navigate } from "react-router-dom";

const Stat = ({ num, text }) => (
  <div className="text-center">
    <h3 className="font-clashDisplay font-bold text-2xl">{num}</h3>
    <p className="text-xs">{text}</p>
  </div>
);

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full    text-white py-12 md:px-12 px-5 ">
      <h1 className=" hero-title  font-clashDisplay text-black font-bold md:text-8xl text-4xl text-center  tracking-wide">
        SMART CONTRACT
      </h1>
      <div className="subtitle font-clashDisplay font-bold md:text-3xl text-2xl text-center w-full sm:w-4/5 mx-auto ">
        <h3 className="mt-6 tracking-wider">
          <span className="bg-gradient-to-l md:px-20 pl-6 py-2 pb-2 rounded-3xl from-[#1d232300] to-[#1D2323]">
            WE MAKE IT EASY TO{" "}
          </span>
          <span className="md:block inline ">
            HOST <span className="text-accent ">RAFFLES ONLINE</span>
          </span>
        </h3>
        <p className="desc  text-text-color font-light text-base   md:mt-4 mt-10 text-center mx-auto">
          Enabling brands, influencers, charities and businesses to run prize
          competitions and sell tickets to win their products, experiences or
          personal items as prizes
        </p>
      </div>
      <div className="btn-container  flex xs:flex-row flex-col-reverse gap-6  sm:w-3/5 w-full  items-center justify-center mx-auto my-10">
        <Button
          text="Catalog"
          additionalClass={
            "text-accent border border-accent bg-black w-full md:w-auto"
          }
        />
        <Button text={ "View Raffles" } onClickHandler={()=>{navigate("/dashboard")}} accent additionalClass="w-full md:w-auto" />
      </div>
      <div className="w-full relative">
        <Background className="absolute  md:-left-12 -left-52 bg -top-60   " />
      </div>
      <div className="stats flex md:w-3/5 w-full mt-24 items-center justify-around  mx-auto">
        <Stat num="432k+" text="Text" />
        <Stat num="432k+" text="Text" />
        <Stat num="432k+" text="Text" />
      </div>

      <div className="content-hero w-full sm:w-5/6  md:w-3/4 md:gap-0  sm:gap-6 sm:items-center md:items-start md:mt-36 mt-24   flex  justify-between mx-auto">
        <RaffleCard/>
        <div className="text-info  sm:w-3/5 md:w-1/2 w-full md:top-11 relative">
          <h1 className="text-3xl font-clashDisplay font-bold ">The platform for <span className="text-accent">Raffling items</span></h1>
          <p className="desc text-sm mt-8 text-text-color font-poppins">Irrespective of the country you reside in, lotteries are found all across the globe. It’s arguably the most popular form of gambling, as you put in so little with a potential massive upside. Winning the lottery is much harder than it sounds, but so many people sign up in hopes they’ll become a millionaire. The lottery can be played in all forms of currencies in today’s age. At the moment there are several cryptocurrency lotteries out there that work solely in cryptocurrencies such as Bitcoin and Ethereum, and give out the prizes in those currencies too. <br/>
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
