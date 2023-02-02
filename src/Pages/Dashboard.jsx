import React, { useState, useEffect } from "react";
import { ReactComponent as SearchIcon } from "../assets/search-icon.svg";
import { ReactComponent as NoRaffle } from "../assets/no-raffle.svg";
import RaffleHero from "../components/RaffleHero/RaffleHero";
import RafflesContainer from "../components/RafflesContainer/RafflesContainer";
import mapCategoryToNumber from "../utils/mapCategoryToNumber";
import { useAccount } from "@web3modal/react";
import Footer from "../components/Footer/Footer";
import { TailSpin } from "react-loader-spinner";

const categories = [
  "Collectible",
  "Home Improvement",
  "Fashion",
  "Food and Beverages",
  "Health and Beauty",
  "Jwellery",
  "Miscellaneous",
  "Realty",
  "Sports",
  "Tech",
  "Vehicles",
];

const Dashboard = ({ raffles, marketplaceContract }) => {
  const { account, isReady } = useAccount();
  const [userAccount, setUserAccount] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [collectibleRaffles, setCollectibleRaffles] = useState([]);
  const [homeImprovementRaffles, setHomeImprovementRaffles] = useState([]);
  const [fashionRaffles, setFashionRaffles] = useState([]);
  const [foodAndBeveragesRaffles, setFoodAndBeveragesRaffles] = useState([]);
  const [healthAndBeautyRaffles, setHealthAndBeautyRaffles] = useState([]);
  const [jwelleryRaffles, setJwelleryRaffles] = useState([]);
  const [miscellaneousRaffles, setMiscellaneousRaffles] = useState([]);
  const [realtyRaffles, setRealtyRaffles] = useState([]);
  const [sportsRaffles, setSportsRaffles] = useState([]);
  const [techRaffles, setTechRaffles] = useState([]);
  const [vehicleRaffles, setVehicleRaffles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(-1);
  const [loadingRaffles, setIsLoadingRaffles] = useState(true);

  useEffect(() => {
    if (isReady) {
      setUserAccount(account.address);
    }
  }, [isReady, account]);
  useEffect(() => {
    if (raffles.length) {
      setCollectibleRaffles(mapCategoryToNumber(raffles, 0, userAccount));
      setHomeImprovementRaffles(mapCategoryToNumber(raffles, 1, userAccount));
      setFashionRaffles(mapCategoryToNumber(raffles, 2, userAccount));
      setFoodAndBeveragesRaffles(mapCategoryToNumber(raffles, 3, userAccount));
      setHealthAndBeautyRaffles(mapCategoryToNumber(raffles, 4, userAccount));
      setJwelleryRaffles(mapCategoryToNumber(raffles, 5, userAccount));
      setMiscellaneousRaffles(mapCategoryToNumber(raffles, 6, userAccount));
      setRealtyRaffles(mapCategoryToNumber(raffles, 7, userAccount));
      setSportsRaffles(mapCategoryToNumber(raffles, 8, userAccount));
      setTechRaffles(mapCategoryToNumber(raffles, 9, userAccount));
      setVehicleRaffles(mapCategoryToNumber(raffles, 10, userAccount));
    }
  }, [raffles, userAccount]);

  const renderCategoryRaffle = () => {
    switch (selectedCategory) {
      case 0:
        return collectibleRaffles;
      case 1:
        return homeImprovementRaffles;
      case 2:
        return fashionRaffles;
      case 3:
        return foodAndBeveragesRaffles;
      case 4:
        return healthAndBeautyRaffles;
      case 5:
        return jwelleryRaffles;
      case 6:
        return miscellaneousRaffles;
      case 7:
        return realtyRaffles;
      case 8:
        return sportsRaffles;
      case 9:
        return techRaffles;
      case 10:
        return vehicleRaffles;
      default:
        return resetCategoryFilter();
    }
  };

  const resetCategoryFilter = () => {
    if (userAccount === process.env.REACT_APP_ADMIN_WALLET_ADDRESS) {
      return raffles;
    } else {
      return raffles.filter((raffle) => {
        return (
          raffle.isverifiedByMarketplace === true ||
          (!raffle.isverifiedByMarketplace &&
            raffle.hoster === userAccount.toLowerCase())
        );
      });
    }
  };

  useEffect(() => {
    if (raffles.length) setIsLoadingRaffles(false);
  }, [raffles]);

  return (
    <>
      {loadingRaffles ? (
        <div className="flex w-full h-screen justify-center items-center">
          <TailSpin
            height="80"
            width="120"
            color="#009797"
            ariaLabel="tail-spin-loading"
            radius="1"
            visible={loadingRaffles}
          />
        </div>
      ) : (
        <>
          <div className="w-11/12 mx-auto ">
            <div className="w-3/5 mx-auto my-1">
              <h3 className="text-3xl font-semibold text-center font-clashDisplay text-accent">
                All Raffles
              </h3>
              <p className="my-2 text-sm text-center text-text-color">
                Join raffles of different categories. The more tickets you buy,
                more is the chance of winning
              </p>
            </div>
            <RaffleHero raffle={raffles[0]} />
            <div className="flex items-start w-11/12 gap-4 mx-auto mt-12 mb-24">
              <div className="bg-gradient-to-br from-black font-clashDisplay border border-[rgba(255,255,255,.3)] rounded-md to-[rgba(255,255,255,0.2)]  basis-1/4 py-4 px-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-md )]">Select By Category</p>
                  <p
                    className="text-xs text-accent cursor-pointer"
                    onClick={() => setSelectedCategory(-1)}
                  >
                    Reset
                  </p>
                </div>
                {categories.map((category, i) => (
                  <p
                    key={i}
                    onClick={() => setSelectedCategory(i)}
                    className="  border-b cursor-pointer hover:opacity-75 border-[rgba(255,255,255,0.3) pb-2 text-xs my-3"
                  >
                    {category}
                  </p>
                ))}
              </div>
              <div className="basis-3/4">
                {renderCategoryRaffle().length > 0 ? (
                  <>
                    <div className="relative w-2/5 p-0">
                      <input
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        type="text"
                        name=""
                        id=""
                        className="bg-black-400 w-full  mx-auto block  py-1.5 focus:outline-accent focus:border-accent px-4 rounded-full border border-accent font-poppins outline-none placeholder:text-text-color placeholder:font-light"
                        placeholder="Search"
                      />
                      <SearchIcon className="absolute -translate-y-1/2 right-4 top-1/2 " />
                    </div>
                    <RafflesContainer
                      marketplaceContract={marketplaceContract}
                      account={userAccount}
                      raffles={renderCategoryRaffle()}
                    />
                  </>
                ) : (
                  <div className="flex flex-col justify-center items-center mt-6">
                    <h2 className="text-2xl">No raffles are created</h2>
                    <NoRaffle className="w-64" />
                  </div>
                )}
              </div>
            </div>
          </div>
          <Footer additionalClass="w-full justify-between md:px-0" />
        </>
      )}
    </>
  );
};

export default Dashboard;
