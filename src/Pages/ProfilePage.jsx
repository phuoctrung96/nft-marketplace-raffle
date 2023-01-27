import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { useAccount } from "@web3modal/react";
import UserInfoCard from "../components/UserInfoCard/UserInfoCard";
import MyStatsCard from "../components/MyStatsCard/MyStatsCard";
import Footer from "../components/Footer/Footer";
import RafflesContainer from "../components/RafflesContainer/RafflesContainer";
import { getUserInfoQuery } from "../utils/query";

const ProfilePage = () => {
  const { account, isReady } = useAccount();
  const [loadUserInfo, { called, loading, data }] = useLazyQuery(
    getUserInfoQuery,
    {
      variables: { address: account.address },
    }
  );
  const [userInfo, setUserInfo] = useState({
    name: "John Malren",
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
    email: "johnmalren@gmail.com",
    number: "+165165386743",
    socialMedia: { twitter: "@johnmalren" },
  });
  const [myStats, setMyStats] = useState({
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ",
    stats: [
      { name: "Invited Person", value: 50 },
      { name: "Invited Person", value: 50 },
      { name: "Invited Person", value: 50 },
    ],
    link: "https://raffall.com/@johnmalren",
  });
  const [userRaffles, setUserRaffles] = useState(null);

  useEffect(() => {
    if (isReady) {
      loadUserInfo();
    }
  }, [isReady, loadUserInfo]);

  useEffect(() => {
    if (data?.rafflePlayers.length) setUserRaffles(data.rafflePlayers[0]);
  }, [data]);

  if (called && loading) return <p>Loading ...</p>;

  return (
    <>
      <div className="w-full h-full py-10 mx-auto md:w-10/12 max-w-7xl mb-5">
        <div className="grid grid-cols-profile-section gap-5 mb-16 auto-rows-fr">
          <div>
            <p className="text-2xl font-clashDisplay font-medium mb-4">
              My Profile
            </p>
            <UserInfoCard userInfo={userInfo} />
          </div>
          <div>
            <p className="text-2xl font-clashDisplay font-medium mb-4">
              My Stats
            </p>
            <MyStatsCard stat={myStats} />
          </div>
        </div>

        <div className="flex justify-between">
          <h3 className="text-3xl font-clashDisplay font-medium mb-4">
            Your Raffles{" "}
            <span className="text-lg font-normal text-accent ml-4">
              {(userRaffles?.hostedRaffles.length || 0) +
                (userRaffles?.enteredRaffles.length || 0)}{" "}
              items
            </span>
          </h3>
          <div className="flex border-accent px-4 py-2.5 border rounded-sort items-center">
            <span className="text-base text-text-color mr-6">Price</span>
            <span className="text-accent text-sm cursor-pointer">
              Lower to Hight
            </span>
          </div>
        </div>
        {userRaffles?.hostedRaffles.length > 0 && (
          <RafflesContainer raffles={userRaffles?.hostedRaffles} />
        )}
        {userRaffles?.enteredRaffles.length > 0 && (
          <RafflesContainer raffles={userRaffles?.enteredRaffles} />
        )}
      </div>
      <div className="w-full">
        <Footer additionalClass="w-full justify-between  md:px-0" />
      </div>
    </>
  );
};

export default ProfilePage;
