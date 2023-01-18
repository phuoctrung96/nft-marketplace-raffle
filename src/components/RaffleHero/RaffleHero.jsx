import { ethers } from "ethers";
import React from "react";

const RaffleHero = ({ raffle }) => {
   
  
   return raffle?.id && (
      <div className=" my-8 h-64 rounded-xl relative w-11/12 mx-auto ">
        {raffle?.images?.length && (
          <img
            src={`https://${raffle.images[0]}`}
            alt=""
            className="h-full w-full object-cover"
          />
        )}
        <div className="raffleInfo text-sm font-clashDisplay absolute py-8 pl-5 pr-3 bg-[rgba(0,0,0,.4)] backdrop-blur-sm right-0  top-0 w-80 bottom-0">
          <p className="font-clashDisplay font-medium text-2xl">
            {raffle.title}
          </p>
          <p className="text-sm  font-clashDisplay mt-3">
            {raffle.description}
          </p>
          <div className="mt-4">
            <p>Buy For:</p>
            <div className="ticekts w-full">
              <div className=" w-full flex gap-3  border border-accent rounded-3xl my-3">
                <div className="price bg-accent py-3 outline outline-accent outline-1 text-center rounded-full w-3/5">
                  <p className="text-white">{ethers.utils.formatEther(raffle.stages[0]?.ticketPrice).toString()} M</p>
                </div>
                <div className="input flex justify-between items-center  w-3/5 pl-2 pr-6">
                  <p className="font-clashDisplay font-medium text-xl">+</p>
                  <p className="font-clashDisplay font-medium text-xl">2</p>
                  <p className="font-clashDisplay font-medium text-xl">-</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) 
  }


export default RaffleHero;
