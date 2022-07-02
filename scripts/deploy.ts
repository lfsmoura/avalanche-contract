import { 
  Contract, 
  ContractFactory 
} from "ethers"
import { ethers } from "hardhat"

const main = async(): Promise<any> => {
  const NFT: ContractFactory = await ethers.getContractFactory("NFT")
  const nft: Contract = await NFT.deploy()

  await nft.deployed()
  console.log(`NFT deployed to: ${nft.address}`)
}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error)
  process.exit(1)
})
