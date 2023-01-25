import { ethers } from "ethers"

const convert=(amount)=>{
    return ethers.utils.formatEther(amount)
}

export default convert;