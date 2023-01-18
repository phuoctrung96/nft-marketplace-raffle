import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ReactComponent as SearchIcon } from "../assets/search-icon.svg";
import { ReactComponent as NoRaffle } from "../assets/no-raffle.svg";
import RaffleHero from "../components/RaffleHero/RaffleHero";
import RafflesContainer from "../components/RafflesContainer/RafflesContainer";
import mapCategoryToNumber from "../utils/mapCategoryToNumber";

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

const Dashboard = ({ raffles }) => {
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
  const [selectedCategory, setSelectedCategory] = useState([]);

  useEffect(() => {
    if (raffles.length) {
      setCollectibleRaffles(mapCategoryToNumber(raffles, 0));
      setHomeImprovementRaffles(mapCategoryToNumber(raffles, 1));
      setFashionRaffles(mapCategoryToNumber(raffles, 2));
      setFoodAndBeveragesRaffles(mapCategoryToNumber(raffles, 3));
      setHealthAndBeautyRaffles(mapCategoryToNumber(raffles, 4));
      setJwelleryRaffles(mapCategoryToNumber(raffles, 5));
      setMiscellaneousRaffles(mapCategoryToNumber(raffles, 6));
      setRealtyRaffles(mapCategoryToNumber(raffles, 7));
      setSportsRaffles(mapCategoryToNumber(raffles, 8));
      setTechRaffles(mapCategoryToNumber(raffles, 9));
      setVehicleRaffles(mapCategoryToNumber(raffles, 10));
    }
  }, [raffles]);

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
        return raffles;
    }
  };

  return (
    <div className="w-11/12 mx-auto ">
      <div className="w-3/5 mx-auto my-10">
        <h3 className="text-3xl font-semibold text-center font-clashDisplay text-accent">
          All Raffles
        </h3>
        <p className="my-2 text-sm text-center text-text-color">
          Join raffles of different categories. The more tickets you buy, more
          is the chance of winning
        </p>
      </div>
      <RaffleHero raffle={vehicleRaffles[0]} />
      <div className="flex items-start w-11/12 gap-4 mx-auto mt-12">
        <div className="bg-gradient-to-br from-black font-clashDisplay border border-[rgba(255,255,255,.3)] rounded-md to-[rgba(255,255,255,0.2)]  basis-1/4 py-4 px-3">
          <p className="font-medium text-md )]">Select By Category</p>
          {categories.map((category, i) => (
            <p
              onClick={() => setSelectedCategory(i)}
              className="  border-b cursor-pointer hover:opacity-75 border-[rgba(255,255,255,0.3) pb-2 text-xs my-3"
            >
              {category}
            </p>
          ))}
        </div>
        <div className="basis-3/4">
          {renderCategoryRaffle().length ? (
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
              <RafflesContainer raffles={renderCategoryRaffle()} />
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
  );
};

export default Dashboard;
