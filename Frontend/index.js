import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectButton = document.getElementById("connectButton")
const withdrawButton = document.getElementById("withdrawButton")
const fundButton = document.getElementById("fundButton")
const balanceButton = document.getElementById("balanceButton")
connectButton.onclick = connect
withdrawButton.onclick = withdraw
fundButton.onclick = fund
balanceButton.onclick = getBalance

async function connect() {
    // if the user is already connected, don't do anything
    // if the user is not connected, connect them
    // if the user is connected, but not the right network, connect them to the right network
    // if the user doesn't have metamask, tell them to install it
    if (typeof window.ethereum !== "undefined") {
        // you can see this in the console
        try {
            await ethereum.request({ method: "eth_requestAccounts" })
        } catch (error) {
            console.log(error)
        }
        connectButton.innerHTML = "Connected"
        const accounts = await ethereum.request({ method: "eth_accounts" })
        console.log(accounts)
    } else {
        connectButton.innerHTML = "Please install MetaMask" // if the user doesn't have metamask, tell them to install it
    }
}

async function withdraw() {
    console.log(`Withdrawing...`)
    if (typeof window.ethereum !== "undefined") {
        // this is a check to see if the user has metamask installed, you can check it in the console in the browser
        const provider = new ethers.providers.Web3Provider(window.ethereum) // to get a provider, you need the window.ethereum object
        await provider.send("eth_requestAccounts", [])
        const signer = provider.getSigner() // to get the signer, you need the provider aka a connection to the blockchain
        const contract = new ethers.Contract(contractAddress, abi, signer) // to create a contract, you need the abi and the address of the contract and the signer
        try {
            const transactionResponse = await contract.withdraw()
            await listenForTransactionMine(transactionResponse, provider)
            // await transactionResponse.wait(1)
        } catch (error) {
            console.log(error)
        }
    } else {
        withdrawButton.innerHTML = "Please install MetaMask"
    }
}

async function fund() {
    const ethAmount = document.getElementById("ethAmount").value
    console.log(`Funding with ${ethAmount}...`)
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const transactionResponse = await contract.fund({
                // the js function knows the fund function since it's in the abi
                value: ethers.utils.parseEther(ethAmount),
            })
            await listenForTransactionMine(transactionResponse, provider) // we can't move to the next line until the transaction is mined
        } catch (error) {
            console.log(error)
        }
    } else {
        fundButton.innerHTML = "Please install MetaMask"
    }
}

async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        try {
            const balance = await provider.getBalance(contractAddress)
            console.log(ethers.utils.formatEther(balance))
        } catch (error) {
            console.log(error)
        }
    } else {
        balanceButton.innerHTML = "Please install MetaMask"
    }
}

function listenForTransactionMine(transactionResponse, provider) {
    // this function is a helper function that listens for a transaction to be mined and then resolves the promise
    console.log(`Mining ${transactionResponse.hash}`)
    return new Promise((resolve, reject) => {
        try {
            provider.once(transactionResponse.hash, (transactionReceipt) => {
                console.log(`Completed with ${transactionReceipt.confirmations} confirmations. `)
                resolve()
            })
        } catch (error) {
            reject(error)
        }
    })
}
