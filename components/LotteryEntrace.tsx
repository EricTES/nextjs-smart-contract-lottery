import React, { useEffect, useState } from "react";
import { useWeb3Contract } from 'react-moralis'
import { abi, contractAddresses } from '../constants';
import { useMoralis } from "react-moralis";
import { BigNumber, ethers } from "ethers";

interface contractAddressesInterface {
    [key: string]: string[]
}


const LotteryEntrance = () => {
    const addresses: contractAddressesInterface = contractAddresses
    const [entranceFee, setEntranceFee] = useState();
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
    console.log(chainIdHex!)
    const chainId = parseInt(chainIdHex || '')
    const raffleAddress = chainId in contractAddresses ? addresses[chainId.toString()][0] : "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"

    // const { runContractFunction: enterRaffle } = useWeb3Contract({
    //     abi: abi,
    //     contractAddress: raffleAddress,
    //     functionName: "enterRaffle",
    //     params: {},
    //     msgValue:,
    // })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: JSON.parse(abi),
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
    })

    async function updateUI() {
        const fee = (await getEntranceFee() as BigNumber).toString()
        console.log(fee)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    return (
        <div>Hi from lottery entrance</div>
    )
}

export default LotteryEntrance;