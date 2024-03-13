# Blockchain Fullstack Project

## Description
This is a full-stack blockchain project that enables users to deploy and interact with basic smart contracts through a localhosted website. The project facilitates the deployment of smart contracts and their integration with a frontend interface for seamless interaction with the blockchain.

## Features
- Deployment of basic smart contracts
- Integration with a frontend interface
- Interaction with deployed contracts through a localhosted website
- Testing functionality with Hardhat
- Gas estimation and USD cost estimation
- Automatic verification of contracts on Etherscan

## Installation
1. Clone the repository.
2. Install dependencies using Yarn: `yarn install`

## Usage
1. Deploy the smart contracts: `yarn hardhat deploy`
2. Test the contracts: `yarn hardhat test`
3. Connect to a testnet: `yarn hardhat deploy --network sepolia`
4. Run scripts for funding or withdrawal: `yarn hardhat run scripts/fund.js` or `yarn hardhat run scripts/withdraw.js`
5. Verify contracts on Etherscan: `yarn hardhat verify --constructor-args arguments.js DEPLOYED_CONTRACT_ADDRESS`

## Environment Setup
- Set SEPOLIA_RPC_URL and PRIVATE_KEY as environment variables. You can add them to a .env file.
- Obtain testnet ETH from faucets.chain.link and ensure it shows up in your Metamask.

## Support
For help or inquiries, feel free to reach out via oundel.store@gmail.com or open an issue in the repository.

## License
This project is licensed under the [MIT License](LICENSE).
