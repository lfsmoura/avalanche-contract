import { 
  Contract, 
  ContractFactory 
} from "ethers"
import { ethers } from "hardhat"

const aDayInSeconds = 3600 * 24;

const main = async(): Promise<any> => {
  const NFT: ContractFactory = await ethers.getContractFactory("NFT")
  const nft: Contract = await NFT.deploy()

  await nft.deployed()
  console.log(`NFT deployed to: ${nft.address}`)

  const [ signer ] = await ethers.getSigners();
  console.log("Signer address:", signer.address)

  const NFTPawnbroker: ContractFactory = await ethers.getContractFactory("NFTPawnbroker")
  const nFTPawnbroker: Contract = await NFTPawnbroker.connect(signer).deploy(1, nft.address, 10, aDayInSeconds)

  await nft.deployed()
  console.log(`NFT Pawnbroker deployed to: ${nft.address}`)
}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error)
  process.exit(1)
})
