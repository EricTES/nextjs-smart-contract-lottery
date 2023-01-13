import React, { useEffect } from "react";
import { useMoralis } from 'react-moralis'


const ManualHeader = () => {
    const { enableWeb3, deactivateWeb3, account, isWeb3Enabled, isWeb3EnableLoading, Moralis } = useMoralis()

    // Upon rendering for the first time, we check if Web3 is enabled,
    // If yes , return
    // if no,  check if our wallet is already connected with the help of local storage. If yes then we enable web3
    useEffect(() => {
        if (isWeb3Enabled) return
        if (typeof window !== undefined && window.localStorage.getItem("connected")) {
            enableWeb3()
        }
    }, [isWeb3Enabled])

    // Use Moralis to execute the function everytime the account change. 
    // If acount is null (not connected) we remove localstorage and deactivate web3
    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(account)
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
            }
        })
    }, [])

    return (
        <div>
            {
                account ? (<div> Connected to {account.slice(0, 6)}....{account.slice(account.length - 4)}</div >) :
                    <button onClick={async () => { await enableWeb3(); window.localStorage.setItem("connected", 'injected') }} disabled={isWeb3EnableLoading}>Connect</button>
            }
        </div>
    )
}

export default ManualHeader;