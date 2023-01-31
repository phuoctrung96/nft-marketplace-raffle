import React, { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import DropDown from "../DropDown/DropDown";
import { ReactComponent as TicketIcon } from "../../assets/ticket.svg";
import Button from "../Button";
import getCurrentStage from "../../utils/getCurrentStage";
import convertETH from "../../utils/convertETH";
import { ethers } from "ethers";
import { useAccount, useContract } from "@web3modal/react";
import "./RaffleModal.style.css";
import RaffleABI from "../../utils/Raffle.json";
// import { TailSpin } from "react-loader-spinner";

Modal.setAppElement("#root");

const raffleStates = [
  "Not Verified",
  "Open",
  "Calculating Winner",
  "Finished",
  "Reverted",
];

const RaffleModal = ({
  modalIsOpen,
  closeModal,
  data,
  marketplaceContract,
}) => {
  const [amount, setAmount] = useState("0");
  const [currentStage, setCurrentStage] = useState({});
  const [mainImage, setMainImage] = useState(data.images[0]);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const { account } = useAccount();

  const { contract:raffleContract } = useContract({
    address: data.raffleAddress,
    abi: RaffleABI,
})

  useEffect(() => {
    if (data?.stages?.length) {
      const filteredStage = getCurrentStage(
        data.stages,
        data.ongoingStage,
        data.title
      );
      setCurrentStage(filteredStage.length ? filteredStage[0] : {});
    }
  }, [data]);

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  useEffect(() => {
    console.log("modal data: ", data);
  }, [data, modalIsOpen]);

  const convertSeconds = useMemo(() => {
    let days = Math.floor(data.raffleEndTime / 86400);
    let hours = Math.floor((data?.raffleEndTime - days * 86400) / 3600);
    let minutes = Math.floor((data.raffleEndTime % 3600) / 60);
    let secs = Math.floor((data.raffleEndTime % 3600) % 60);

    return { days, hours, minutes, secs };
  }, [data]);

  useEffect(() => {
    if (modalIsOpen) {
      const elements = document.querySelectorAll(".ReactModalPortal");

      elements.forEach((element) => {
        element.className += " filter-blur";
      });
    }
  }, [modalIsOpen]);

  useEffect(() => {
    setAmount(
      Number(currentStage.ticketsAvailable) - Number(currentStage.ticketsSold)
    );
  }, [currentStage]);

  const stages = {
    0: "Pre-sale",
    1: "Sale",
    2: "Premium",
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "90vh",
      width: "80vw",
      backgroundColor: "#14161B",
      padding: "20px",
    },
  };

  const verifyRaffle = async () => {
    setIsActionLoading(true);
    try {
      if (marketplaceContract.address) {
        const signer = await account.connector.getSigner();
        const signedContract = marketplaceContract.connect(signer);
      
        await signedContract.verifyRaffle(data.raffleTicker);
        setIsActionLoading(false);
      }
    } catch (err) {
      setIsActionLoading(false);
    }
  };

  const distributePrizes=async()=>{
    setIsActionLoading(true);
    try {
      if (data.raffleAddress && account.address===process.env.REACT_APP_ADMIN_WALLET_ADDRESS && raffleStates[data.currentState]==='Finished') {
        const signer = await account.connector.getSigner();
        const signedContract = raffleContract.connect(signer);
        // const res = await signedContract.getBalance()
        await signedContract.distributePrizes();
        setIsActionLoading(false);
      }
    } catch (err) {
      setIsActionLoading(false);
    }
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      className=""
      style={customStyles}
      onRequestClose={closeModal}
      contentLabel="Main Prize"
      closeTimeoutMS={200}
    >
      <div className="h-full p-8 pt-0 flex  flex-col font-poppins   text-white bg-[#14161B]  ">
        <div className="container  text-center py-2 rounded-md w-1/6 absolute right-5 font-xs bg-[rgba(255,255,255,0.1)] text-accent">
          {raffleStates[data.currentState]}
        </div>
        <h2 className="mb-5 mt-8 text-2xl font-medium font-poppins">
          Main Prize
        </h2>
        <div className="flex  flex-col xl:flex-row gap-16  w-full ">
          <div className="w-full h-full xl:w-1/3 ">
            <div className="flex justify-center w-full mx-auto xl:justify-start ">
              <img
                src={`https://${mainImage}`}
                className="relative flex items-center  justify-center object-cover w-full rounded-lg border border-border cursor-pointer opacity-60 h-96"
                alt={data.title}
              />
            </div>
            {data.images.length > 1 && (
              <div className="flex items-center justify-center gap-4 mt-4 w-full   xl:justify-start">
                {data.images.map((item, i) => {
                  return (
                    item !== mainImage && (
                      <img
                        onClick={() => setMainImage(item)}
                        className="rounded-lg cursor-pointer w-full object-cover h-[120px] border border-border"
                        src={`https://${item}`}
                        alt={item}
                        key={item}
                      />
                    )
                  );
                })}
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between  h-96 pb-4 w-1/3  ">
            <div>
              <h3 className="text-2xl xl:text-3xl font-clashDisplay font-medium">
                {data.title}
              </h3>

              <div className="z-30 flex items-center my-5 text-2xl">
                <div className="flex items-center gap-1 tickets-stats">
                  <p className="text-accent">{currentStage.ticketsSold}</p>
                  <p className="">/{currentStage.ticketsAvailable}</p>
                  <TicketIcon className="ml-3" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-12 lg:w-2/3 ">
              <div className="flex w-full gap-4 items-center ">
                <div className="mx-auto flex w-full mt-4 font-bold time font-clashDisplay  justify-between">
                  <div className="hour text-center   after:inline-block after:absolute after:top-2 after:font-bold after:-right-full relative">
                    <h3 className="text-xl font-bold font-clashDisplay">
                      {convertSeconds.days}
                    </h3>
                    <p className="text-xs font-normal">Days</p>
                  </div>
                  <div className="minutes text-center    after:inline-block after:absolute after:top-1 after:font-bold after:-right-full relative">
                    {" "}
                    <h3 className="text-xl font-bold font-clashDisplay">
                      {convertSeconds.hours}
                    </h3>
                    <p className="text-xs font-normal">Hours</p>
                  </div>
                  <div className="text-center seconds ">
                    <h3 className="text-xl font-bold font-clashDisplay">
                      {convertSeconds.minutes}
                    </h3>
                    <p className="text-xs font-normal">Minutes</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-accent">Left</p>
                </div>
              </div>

              <div className="flex w-full gap-3 mb-4  border  border-accent rounded-3xl">
                <div className="w-3/5 py-3 text-center rounded-full price bg-accent outline outline-accent outline-1">
                  <button className="text-white">
                    {currentStage.ticketPrice &&
                      Number(
                        ethers.utils.formatEther(currentStage.ticketPrice)
                      ).toFixed(3)}
                    <span className="font-bold"> M</span>
                  </button>
                </div>
                <div className="flex items-center justify-between w-full pl-2 pr-6 lg:w-3/5 input">
                  <button
                    className="text-xl font-medium font-clashDisplay"
                    onClick={() => {
                      setAmount((prev) => +prev + 1);
                    }}
                  >
                    +
                  </button>
                  <input
                    value={amount}
                    type="number"
                    onChange={handleAmount}
                    className="w-full h-full text-xl font-medium text-center border-none disable-arrows font-clashDisplay bg-inherit"
                  />
                  <button
                    className="text-xl font-medium font-clashDisplay"
                    onClick={() => {
                      setAmount((prev) => {
                        if (+prev > 0) {
                          return +prev - 1;
                        }
                        return 0;
                      });
                    }}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full h-auto mt-12">
          <h3 className="text-xl">About Raffle</h3>
          <p className="text-[#9C9C9C] w-full mt-5">{data.description}</p>
        </div>

        <div className="flex flex-col w-full my-10 ">
          <h3>Ongoing Stage: {stages[data.ongoingStage]}</h3>
          {account?.address?.address ===
            process.env.REACT_APP_ADMIN_WALLET_ADDRESS &&
            data.stages?.map((item) => {
              return (
                <DropDown
                  key={item.stageType}
                  title={stages[item.stageType]}
                  data={() => (
                    <div className="flex gap-12 w-full h-auto ">
                      <span>
                        Ticket Price: {convertETH(item.ticketPrice)} M
                      </span>
                      <span>Ticket Available: {item.ticketsAvailable}</span>
                      <span>Tickets Sold: {item.ticketsSold}</span>
                    </div>
                  )}
                />
              );
            })}
        </div>

        <div className="w-full my-5">
          <h3 className="text-white">
            {data.prizes?.length} {data.prizes?.length > 1 ? "Prizes" : "Prize"}{" "}
          </h3>
          {data.prizes.map((prize, index) => (
            <DropDown
              key={prize.prizeTitle}
              title={prize.prizeTitle}
              prize={prize}
              data={() => <p className="p-4">Amount {prize.prizeAmount}</p>}
            />
          ))}
        </div>

        {data.charity.charityAddress !==
        "0x0000000000000000000000000000000000000000" ? (
          <div className="flex flex-col w-full h-auto py-10 ">
            <h3 className="mb-5">Charity</h3>
            <h4>{data.charity.charityName}</h4>
            <p>The {data.charity.percentToDonate}% of amount to donate</p>
          </div>
        ) : null}

        {data.winners.length &&
        data.winners[0] !== ethers.constants.AddressZero ? (
          <div className="my-3">
            <h5 className="mb-3">
              {data.winners.length > 1 ? "Winners" : "Winner"}
            </h5>
            {data.winners.map((winner) => (
              <p className="text-sm  my-2 text-[#9C9C9C]">{winner}</p>
            ))}
          </div>
        ) : null}

        {account?.address === process.env.REACT_APP_ADMIN_WALLET_ADDRESS ? (
          <div className="flex items-center justify-center w-full gap-3 pb-10 mt-4">
            <Button
              text={raffleStates[data.currentState]==='Not Verified' ? 'Verify Raffle' : 'Distribute Prizes'}
              accent
              additionalClass=""
              onClickHandler={raffleStates[data.currentState]==='Not Verified' ? verifyRaffle : distributePrizes}
              isActionLoading={isActionLoading}
            />
          </div>
        ) : null}
      </div>
    </Modal>
  );
};

export default RaffleModal;
