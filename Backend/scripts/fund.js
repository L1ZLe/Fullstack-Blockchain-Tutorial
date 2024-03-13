const { ethers, getNamedAccounts } = require("hardhat")

// we use .js instead of .sol because we need to use the ethers library to interact with the contract
// we also use .js because we want to use the hardhat library to deploy the contract and to use hardhat, we need to install it
// we also use .js because we want to test the contracts

async function main() {
    const { deployer } = await getNamedAccounts()
    const fundMe = await ethers.getContract("FundMe", deployer)
    console.log(`Got contract FundMe at ${fundMe.address}`)
    console.log("Funding contract...")
    const transactionResponse = await fundMe.fund({
        value: ethers.utils.parseEther("0.1"),
    })
    await transactionResponse.wait()
    console.log("Funded!")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
