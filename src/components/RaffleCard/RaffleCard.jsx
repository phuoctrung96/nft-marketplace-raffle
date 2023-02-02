import React, { useEffect, useState } from "react";
import getCurrentStage from "../../utils/getCurrentStage";
import { ReactComponent as TicketIcon } from "../../assets/ticket.svg";
import RaffleABI from "../../utils/Raffle.json";
import { BigNumber, ethers } from "ethers";
import RaffleModal from "../RaffleModal/RaffleModal";

const RaffleCard = ({
  additionalClass,
  raffle,
  account,
  marketplaceContract,
}) => {
  const [currentStage, setCurrentStage] = useState({});
  const [ticketNumber, setTicketNumber] = useState("");
  const [raffleContract, setRaffleContract] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [endTime, setEndTime] = useState({ days: 0, hours: 0, minutes: 0, secs: 0 });

  useEffect(() => {
    if (raffle?.stages?.length) {
      const filteredStage = getCurrentStage(
        raffle.stages,
        raffle.ongoingStage,
        raffle.title
      );
      setCurrentStage(filteredStage.length ? filteredStage[0] : {});
    }
  }, [raffle]);

  useEffect(() => {
    if (raffle) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setRaffleContract(
        new ethers.Contract(raffle.raffleAddress, RaffleABI, signer)
      );
    }
  }, [raffle]);

  useEffect(() => {
    setTicketNumber(
      Number(currentStage.ticketsAvailable) - Number(currentStage.ticketsSold)
    );
  }, [currentStage]);

  const enterRaffle = async () => {
    const amount = BigNumber.from(currentStage.ticketPrice).mul(ticketNumber);
    await raffleContract.enterRaffle({ value: amount });
  };

  const calculateDurationDate = (raffle) => {
    let raffleEndTime = raffle?.raffleEndTime
    if (raffle && raffle.raffleEndTime) {
      raffleEndTime = (Number(raffle.raffleEndTime) + Number(raffle.createdAt)) * 1000;
    } else {
      raffleEndTime = 0;
    }
    const now = new Date().getTime();
    const expiration = raffleEndTime;
    const diff = expiration - now;
    const day = (Math.floor(diff / (1000 * 3600 * 24)));
    const mod = diff % (1000 * 3600 * 24);
    const hour = (Math.floor(mod / (1000 * 3600)));
    const mod1 = mod % (1000 * 3600);
    const minute = (Math.floor(mod1 / (1000 * 60)));
    const mod2 = mod1 % (1000 * 60);
    const second = (Math.floor(mod2 / 1000));
    setEndTime({ days: day > 0 ? day : 0, hours: hour > 0 ? hour : 0, minutes: minute > 0 ? minute : 0, secs: second > 0 ? second : 0 });
  };

  useEffect(() => {
    calculateDurationDate(raffle);
    const interval = setInterval(() => {
      calculateDurationDate(raffle);
    }, 60000);
    return () => clearInterval(interval);
  }, [raffle]);

  return (
    raffle?.id && (
      <>
        <div
          className={` sm:w-3/5 md:w-2/5 px-3 relative backdrop-filter py-2 sm:block z-100 bg-gradient-to-b drop-shadow-sm from-black to-[rgba(255,255,255,.15)] rounded-xl ${additionalClass} `}
        >
          <div className="relative">
            {raffle && (
              <img
                src={`https://${raffle?.images[0]}`}
                className="relative block object-cover w-full h-64 rounded-md cursor-pointer opacity-60"
                alt=""
                onClick={() => {
                  setOpenModal(true);
                }}
              />
            )}

            <div className="absolute z-30 flex items-center gap-1 text-lg tickets-info md:bottom-2 sm:bottom-6 right-6">
              <div className="flex items-center gap-1 tickets-stats ">
                <p className="text-accent">{currentStage.ticketsSold}</p>
                <p className="">/{currentStage.ticketsAvailable}</p>
              </div>
              <TicketIcon />
            </div>
          </div>
          <div className="relative flex flex-col justify-end ">
            <div className="">
              <h3 className="mt-4 text-xl raffle-title">{raffle.title}</h3>
              <p className="mt-2 text-xs font-medium text-text-color">
                {raffle.description}.
              </p>
            </div>
            <div className="flex items-center justify-center gap-10 mt-4 font-bold time font-clashDisplay">
              <div className="hour text-center after:content-[':']   after:inline-block after:absolute after:top-2 after:font-bold after:-right-5 relative">
                <h3 className="text-xl font-medium font-clashDisplay">
                  {endTime.days}
                </h3>
                <p className="text-xs font-normal">Days</p>
              </div>
              <div className="minutes text-center after:content-[':']   after:inline-block after:absolute after:top-2 after:font-bold after:-right-5 relative">
                {" "}
                <h3 className="text-xl font-medium font-clashDisplay">
                  {endTime.hours}
                </h3>
                <p className="text-xs font-normal">Hours</p>
              </div>
              <div className="text-center seconds ">
                <h3 className="text-xl font-medium font-clashDisplay">
                  {endTime.minutes}
                </h3>
                <p className="text-xs font-normal">Minutes</p>
              </div>
            </div>

            <div className="w-full ticekts">
              <div className="flex w-full gap-3 my-3 border border-accent rounded-3xl">
                <div className="w-3/5 py-3 text-center rounded-full price bg-accent outline outline-accent outline-1">
                  <button onClick={() => enterRaffle()} className="text-white">
                    {currentStage.ticketPrice &&
                      Number(
                        ethers.utils.formatEther(currentStage.ticketPrice)
                      ).toFixed(3)}{" "}
                    <span className="font-bold"> M</span>
                  </button>
                </div>
                <div className="flex items-center justify-between w-3/5 pl-2 pr-6 input">
                  <button
                    className="text-xl font-medium font-clashDisplay"
                    onClick={() => {
                      if (ticketNumber < currentStage.ticketsAvailable) {
                        setTicketNumber((prev) => prev + 1);
                      }
                    }}
                  >
                    +
                  </button>
                  <input
                    value={ticketNumber.toString()}
                    onChange={(e) => setTicketNumber(e.target.value)}
                    className="w-full h-full text-xl font-medium text-center border-none font-clashDisplay bg-inherit"
                  />
                  <button
                    className="text-xl font-medium font-clashDisplay"
                    onClick={() => {
                      if (ticketNumber !== 0) {
                        setTicketNumber((prev) => prev - 1);
                      }
                    }}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <RaffleModal
          marketplaceContract={marketplaceContract}
          modalIsOpen={openModal}
          account={account}
          data={raffle}
          closeModal={() => setOpenModal(false)}
        />
      </>
    )
  );
};

export default RaffleCard;
