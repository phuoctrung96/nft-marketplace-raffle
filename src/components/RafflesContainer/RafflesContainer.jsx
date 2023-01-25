import React from "react";
import RaffleCard from "../RaffleCard/RaffleCard";

const RafflesContainer = ({ raffles, account, marketplaceContract }) => {
  return (
    <div className="flex flex-wrap gap-3 mt-6">
      {raffles?.length
        ? raffles.map((raffle) => (
            <RaffleCard
              key={raffle.id}
              marketplaceContract={marketplaceContract}
              account={account}
              raffle={raffle}
            />
          ))
        : null}
    </div>
  );
};

export default RafflesContainer;
