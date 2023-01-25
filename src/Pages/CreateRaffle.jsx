import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount, useContract } from "@web3modal/react";
import CreateRaffleInfo from "../components/CreateRaffleInfo/CreateRaffleInfo";
import RafflePrizes from "../components/RafflePrizes/RafflePrizes";
import ImageUploading from "react-images-uploading";
import { ReactComponent as PlusIcon } from "../assets/Plus.svg";
import { ReactComponent as CloseIcon } from "../assets/cross-icon.svg";
import Line from "../components/Line";
import { Web3Storage } from "web3.storage";
import RaffleStages from "../components/RaffleStages/RaffleStages";
import CreateRaffleHeader from "../components/CreateRaffleHeader";
import CustomDatePicker from "../components/CustomDatePicker/CustomDatePicker";
import RaffleMarketplaceABI from "../utils/RaffleMarketplace.json";

const CreateRaffle = () => {
  const [raffleInfo, setRaffleInfo] = useState({
    raffleCategory: "",
    raffleTitle: "",
    raffleDescription: "",
    raffleThreshold: "",
    charityName: "",
    charityAddress: ethers.constants.AddressZero,
    percentToDonate: "0",
    images: [""],
  });

  const [prizes, setPrizes] = useState([
    {
      prizeTitle: "",
      country: "",
      prizeAmount: "0",
    },
  ]);

  const [stages, setStages] = useState([
    {
      stageType: "0",
      ticketsAvailable: "",
      ticketPrice: "",
      ticketsSold: 0,
    },
  ]);

  const [images, setImages] = useState([]);

  const [durationDate, setDurationDate] = useState(null);
  
  const [currentSection, setCurrentSection] = useState('Raffle Info');
  const [isValid, setIsValid] = useState(false);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,

      color: "white",
      background: "#202020",
      padding: "14px 20px",
      fontSize: "0.875rem",
      ":active": { backgroundColor: "#009797", color: "white" },
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "0.875rem",
      color: "#828282",
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      background: "#202020",
      display: "flex",
      padding: 2,
      borderRadius: "0.125rem",
      color: "white",
      marginTop: "0.75rem",
      cursor: "pointer",
    }),
    singleValue: (provided, state) => {
      const backgroundColor = "#202020";
      return {
        ...provided,
        backgroundColor,
        padding: 0,
        color: "#828282",
        fontSize: "0.875rem",
      };
    },
  };

  const { account } = useAccount();
  const { contract } = useContract({
    address: process.env.REACT_APP_RAFFLE_MARKETPLACE_CONTRACT,
    abi: RaffleMarketplaceABI,
  });

  useEffect(() => {
    setIsValid(validateRaffleInfo());
  }, [raffleInfo, prizes, durationDate]);

  const onImageChange = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
  };

  const storeFilesToIPFS = async (files) => {
    const storageClient = new Web3Storage({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEE0YjlERkZFRkRmNTBEMjQxNGRCMUQzZDVjNTM5NjAxOWU0RWY3MGEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjcyODM0MTU4MjMsIm5hbWUiOiJ0ZW1wIn0.6Wurajb6Thwst0l89ScOA5spKiJQijJZx5XdgMsHCT8",
    });

    const cid = await storageClient.put(files);

    const imgUris = images.map(
      (img) => `${cid}.ipfs.w3s.link/${img.file.name}`
    );

    return imgUris;
  };

  const createRaffleHandler = async () => {
    try {
      let uris = [""];
      const raffleImages = images.map((img) => img.file);
      if (images.length > 0) {
        uris = await storeFilesToIPFS(raffleImages);
      }

      const { days, hours, minutes, seconds } = getTimeRemaining(durationDate);

      const raffleDuration = days * 86400 + hours * 3600 + minutes * 60 + seconds;

      const charityInfo = {
        charityName: raffleInfo.charityName,
        charityAddress: raffleInfo.charityAddress,
        percentToDonate: raffleInfo.percentToDonate,
      };

      //TODO: sort stages by each stageType, put presale upper than sale, sale upper than premium

      const raffleParams = [
        raffleInfo.raffleCategory,
        raffleInfo.raffleTitle,
        raffleInfo.raffleDescription,
        raffleDuration,
        raffleInfo.raffleThreshold,
        uris,
        prizes,
        charityInfo,
        stages,
      ];

      const signer = await account.connector.getSigner();
      const signedContract = contract.connect(signer);
      const tx = await signedContract.createRaffle(...raffleParams);
      console.log("success:: ", tx);
    } catch (err) {
      console.log("error:: ", err);
    }
  };

  // create function to check if all raffleInfo is filled
  const handleNextStep = (e) => {
    e.preventDefault();

    if (validateRaffleInfo()) {
      setCurrentSection("Stages and Ticket Info");
    } else {
      const {
        raffleCategory,
        raffleTitle,
        raffleDescription,
        raffleThreshold,
        images,
      } = raffleInfo;

      const allPrizes = prizes;
      const allCountriesFilled = allPrizes.every(
        (prize) => prize.country !== ""
      );
      const allTitlesFilled = allPrizes.every(
        (prize) => prize.prizeTitle !== ""
      );

      // show error message for all which field is missing
      let error = ``;
      if (!raffleCategory) {
        error += `Raffle Category, `;
      }
      if (!raffleTitle) {
        error += `Raffle Title, `;
      }
      if (!raffleDescription) {
        error += `Raffle Description, `;
      }
      if (!raffleThreshold) {
        error += `Raffle Threshold, `;
      }

      if (raffleThreshold > 100) {
        error += `Raffle Threshold should be less than 100, `;
      }

      if (images.length < 1) {
        error += `Raffle Images, `;
      }

      if (!durationDate) {
        error += `Raffle Deadline, `;
      }

      if (!allCountriesFilled) {
        error += `Prize Country, `;
      }
      if (!allTitlesFilled) {
        error += `Prize Title, `;
      }

      error = error.slice(0, -2);
      alert(`Please fill in the following fields: ${error}`);
    }
  };

  const validateRaffleInfo = () => {
    const {
      raffleCategory,
      raffleTitle,
      raffleDescription,
      raffleThreshold,
      images,
    } = raffleInfo;

    const allPrizes = prizes;

    // check if all countries in prizes are filled
    const allCountriesFilled = allPrizes.every((prize) => prize.country !== "");

    // check if all titles in prizes are filled
    const allTitlesFilled = allPrizes.every((prize) => prize.prizeTitle !== "");

    if (
      raffleCategory &&
      raffleTitle &&
      raffleDescription &&
      raffleThreshold &&
      images.length >= 1 &&
      durationDate &&
      allCountriesFilled &&
      allTitlesFilled
    ) {
      return true;
    }

    return false;
  };

  const handleChangeDate = (date) => {
    setDurationDate(date);
  };

  const getTimeRemaining = (date) => {
    const today = new Date();
    const total = date.getTime() - today.getTime();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  return (
    <div className="w-full px-5 mt-10 mb-20 md:px-12">
      <div className="flex items-center justify-between">
        <CreateRaffleHeader
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          raffInfoValid={isValid}
        />
      </div>
      {currentSection === "Raffle Info" ? (
        <div>
          <div className="container flex w-full gap-6">
            <div className="w-5/12 inputs-container">
              <CreateRaffleInfo
                raffleInfo={raffleInfo}
                setRaffleInfo={setRaffleInfo}
                customStyles={customStyles}
                images={images}
                onImageChange={onImageChange}
              />
              <RafflePrizes
                customStyles={customStyles}
                prizes={prizes}
                setPrizes={setPrizes}
              />
            </div>
            <div className={`img-containerw-full w-7/12  mt-16`}>
              <p className="block">Upload Item Images</p>
              <p className="mt-3 text-xs text-accent">(Max 5 alowed)</p>

              <Line additionalClass="opacity-20 " />
              <ImageUploading
                multiple
                value={images}
                onChange={onImageChange}
                maxNumber={5}
                dataURLKey="data_url"
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  // write your building UI
                  <div className="w-full upload__image-wrapper ">
                    {imageList.length ? (
                      <button
                        className="block ml-auto text-sm text-accent "
                        style={isDragging ? { color: "red" } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        Add more images
                      </button>
                    ) : null}
                    &nbsp;
                    {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                    <div
                      className={`img-container border border-accent ${
                        images.length
                          ? "h-auto flex flex-wrap gap-4 justify-center "
                          : "h-2/3"
                      } w-full flex p-8 ${
                        !imageList.length && " justify-center items-center"
                      }`}
                    >
                      {!imageList.length ? (
                        <PlusIcon
                          className="w-24 h-24 cursor-pointer"
                          onClick={onImageUpload}
                        />
                      ) : (
                        imageList.map((image, index) => (
                          <div
                            key={index}
                            className="relative object-cover image-item w-72 "
                          >
                            <img
                              src={image["data_url"]}
                              alt=""
                              className="inline-block rounded-sm drop-shadow-md"
                            />
                            <div className="image-item__btn-wrapper">
                              <CloseIcon
                                className="absolute w-6 h-6 cursor-pointer right-2 top-2 hover:opacity-60"
                                onClick={() => onImageRemove(index)}
                              />
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </ImageUploading>
              <div className="container mt-16">
                <p>Raffle Deadline</p>
                <Line additionalClass="w-32" />
                <CustomDatePicker
                  placeholder={"Select raffle deadline"}
                  value={durationDate}
                  onChange={handleChangeDate}
                  isClearable={true}
                />
              </div>
            </div>
          </div>
          <button
            className="block px-16 py-3 mt-10 text-white rounded-sm bg-accent "
            onClick={handleNextStep}
          >
            Next
          </button>
        </div>
      ) : (
        <RaffleStages
          createRaffleHandler={createRaffleHandler}
          raffleInfo={raffleInfo}
          setRaffleInfo={setRaffleInfo}
          stages={stages}
          setStages={setStages}
          customStyles={customStyles}
          setCurrentSection={setCurrentSection}
        />
      )}
    </div>
  );
};

export default CreateRaffle;
