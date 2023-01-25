import { gql } from "@apollo/client";
const AllRafflesQuery = gql`
  query {
    raffles {
      id
      raffleTicker
      hoster
      isverifiedByMarketplace
      raffleAddress
      category
      title
      description
      raffleEndTime
      threshold
      images
      charity {
        charityName
        charityAddress
        percentToDonate
      }
      createdAt
      ongoingStage
      winners
      currentState
      stages {
        stageType
        ticketPrice
        ticketsSold
        ticketsAvailable
      }
      prizes {
        prizeTitle
        prizeCollectionCountry
        prizeAmount
      }
    }
  }
`;

const getOneRaffleQuery = gql`
  query getOneRaffle($id: ID!) {
    raffle(id: $id) {
      id
      raffleTicker
      hoster
      isverifiedByMarketplace
      raffleAddress
      category
      title
      description
      raffleEndTime
      threshold
      images
      charity {
        charityName
        charityAddress
        percentToDonate
      }
      createdAt
      ongoingStage
      winners
      currentState
      stages {
        stageType
        ticketPrice
        ticketsSold
        ticketsAvailable
      }
      prizes {
        prizeTitle
        prizeCollectionCountry
        prizeAmount
      }
    }
  }
`;

const getUserInfoQuery = gql`
  query getUserInfo($address: String!) {
    rafflePlayers(where: { address: $address }) {
      id
      address
      enteredRaffles {
        id
        ticketsBought
        raffle {
          id
          raffleTicker
          hoster
          isverifiedByMarketplace
          raffleAddress
          category
          title
          description
          raffleEndTime
          threshold
          images
          charity {
            charityName
            charityAddress
            percentToDonate
          }
          createdAt
          ongoingStage
          winners
          currentState
          stages {
            stageType
            ticketPrice
            ticketsSold
            ticketsAvailable
          }
          prizes {
            prizeTitle
            prizeCollectionCountry
            prizeAmount
          }
        }
      }
      hostedRaffles {
        id
        raffleTicker
        hoster
        isverifiedByMarketplace
        raffleAddress
        category
        title
        description
        raffleEndTime
        threshold
        images
        charity {
          charityName
          charityAddress
          percentToDonate
        }
        createdAt
        ongoingStage
        winners
        currentState
        stages {
          stageType
          ticketPrice
          ticketsSold
          ticketsAvailable
        }
        prizes {
          prizeTitle
          prizeCollectionCountry
          prizeAmount
        }
      }
    }
  }
`;

export { AllRafflesQuery, getOneRaffleQuery, getUserInfoQuery };
