import React, { useEffect, useState } from "react"
import { useWeb3Contract, useMoralisQuery } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { BigNumber, ethers } from "ethers"
import { useNotification } from "@web3uikit/core"
import { Bell } from "@web3uikit/icons"

interface contractAddressesInterface {
    [key: string]: string[]
}
declare global {
    interface Window {
        ethereum?: any
    }
}

const LotteryEntrance = () => {
    const addresses: contractAddressesInterface = contractAddresses
    // we are able to get the chain ID thanks to the ConnectButton (Header.tsx) which
    // sends this information to the MoralisProvider (_app.tsx)
    const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis()
    const chainId = parseInt(chainIdHex || "")
    const raffleAddress =
        chainId in contractAddresses ? addresses[chainId.toString()][0] : undefined

    const [entranceFee, setEntranceFee] = useState("0")
    const [numberOfPlayers, setNumberOfPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("")

    // This dispatch allows us to display a slide in notificaiton.
    const dispatch = useNotification()

    /*
    useWeb3Contract returns a function from our contract based on the specified data:
    - abi
    - contract address
    - functionName
    */
    const {
        runContractFunction: enterRaffle,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: JSON.parse(abi),
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        params: {},
        msgValue: entranceFee,
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: JSON.parse(abi),
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
    })

    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: JSON.parse(abi),
        contractAddress: raffleAddress,
        functionName: "getNumberOfPlayers",
        params: {},
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: JSON.parse(abi),
        contractAddress: raffleAddress,
        functionName: "getRecentWinner",
        params: {},
    })

    // Update the Entrance Fee, Number of Players and Recent Winner on the webpage
    async function updateUI() {
        const entraceFeeFromCall = ((await getEntranceFee()) as BigNumber).toString()
        const numberOfPlayersFromCall = ((await getNumberOfPlayers()) as BigNumber).toString()
        const recentWinnerFromCall = (await getRecentWinner()) as string
        setEntranceFee(entraceFeeFromCall)
        setNumberOfPlayers(numberOfPlayersFromCall)

        setRecentWinner(recentWinnerFromCall)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            console.log("Update UI")
            updateUI()
        }
    }, [isWeb3Enabled, recentWinner])

    // Listen to when WinnerPicked Event is fired
    useEffect(() => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const raffle = new ethers.Contract(
                raffleAddress || "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9", //had to hardcode the contract address, since I was running into some otherissues
                abi,
                signer
            )

            raffle.on("WinnerPicked", async (recentWinner) => {
                setRecentWinner(recentWinner) //useState
            })
        }
    }, [])

    // Dispatch slide in notificaiton and update webpage information
    // when contract function call is a success
    const handleSuccess = async (tx: any) => {
        const txReceipt = await tx.wait(1)
        console.log("Tx Receipt", txReceipt)
        handleNewNotification()
        updateUI()
    }

    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Tx Notification",
            position: "topR",
            icon: <Bell />,
        })
    }

    return (
        <div>
            Hi from lottery entrance
            {raffleAddress ? (
                <div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                        onClick={async function () {
                            await enterRaffle({
                                onSuccess: handleSuccess,
                                onError: (error) => console.log("Enter raffle Error", error),
                            })
                        }}
                        disabled={isLoading || isFetching}
                    >
                        {isLoading || isFetching ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            <div> Enter Raffle</div>
                        )}
                    </button>
                    <div>Entrance Fee: {ethers.utils.formatEther(entranceFee)} ETH</div>
                    <div>The current number of players is: {numberOfPlayers}</div>
                    <div>The most previous winner was: {recentWinner}</div>
                </div>
            ) : (
                <div>No Raffle Address Deteched</div>
            )}
        </div>
    )
}

export default LotteryEntrance
