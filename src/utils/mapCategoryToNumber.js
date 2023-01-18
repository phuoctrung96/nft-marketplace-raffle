const mapCategoryToNumber=(raffles,i)=>{
  return  raffles.filter((raffle)=>raffle.category===i)
}

export default mapCategoryToNumber