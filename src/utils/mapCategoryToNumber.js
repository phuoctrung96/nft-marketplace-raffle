const mapCategoryToNumber=(raffles,i,address)=>{
  if(address===process.env.REACT_APP_ADMIN_WALLET_ADDRESS){
    return  raffles.filter((raffle)=>raffle.category===i)

  }else{
    return raffles.filter((raffle)=>raffle.category===i && raffle.isverifiedByMarketplace)
  }
}

export default mapCategoryToNumber