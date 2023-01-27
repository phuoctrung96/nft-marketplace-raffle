import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Web3Modal, useAccount, useContract } from "@web3modal/react";
import { chains } from "@web3modal/ethereum";
import { useQuery } from "@apollo/client";
import {
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { AllRafflesQuery } from "./utils/query";
import Header from "./components/Header/Header";
import LandingPage from "./Pages/LandingPage";
import CreateRaffle from "./Pages/CreateRaffle";
import Dashboard from "./Pages/Dashboard";
import RaffleMarketplaceABI from "./utils/RaffleMarketplace.json";
import PromoRafflePage from "./Pages/PromoRafflePage";
import ProfilePage from "./Pages/ProfilePage";
import "./App.css";

const config = {
  projectId: process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID,
  theme: "dark",
  accentColor: "teal",
  ethereum: {
    appName: "web3Modal",
    chains: [chains.polygonMumbai],
  },
};

const googleClientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  const { account, isReady } = useAccount();
  const { data } = useQuery(AllRafflesQuery);
  const [userAccount, setUserAccount] = useState("");
  const [raffles, setRaffles] = useState([]);
  const { contract } = useContract({
    address: process.env.REACT_APP_RAFFLE_MARKETPLACE_CONTRACT,
    abi: RaffleMarketplaceABI,
  });

  useEffect(() => {
    if (data?.raffles.length) {
      setRaffles(data.raffles);
    }
  }, [data]);

  useEffect(() => {
    if (isReady) {
      setUserAccount(account.address);
    }
  }, [isReady, account]);

  return (
    <div className="w-full min-h-screen py-2 text-white bg-black App font-poppins">
      <GoogleOAuthProvider clientId={googleClientID}>
      <Header account={userAccount} />
      </GoogleOAuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create" element={<CreateRaffle />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard marketplaceContract={contract} raffles={raffles} />
          }
        />
        <Route path="/promo-raffle" element={<PromoRafflePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>

      <Web3Modal config={config} />
    </div>
  );
}

export default App;
